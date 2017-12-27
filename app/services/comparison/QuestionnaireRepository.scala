package services.comparison

import com.google.inject.{Inject, Singleton}
import models._
import play.api.libs.json.{JsValue, Json, Writes}
import services.PostgresService
import slick.jdbc.PostgresProfile.api._
import slick.lifted.QueryBase

import scala.collection.immutable
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

case class QuestionnaireWithPictures(base: Questionnaire, pictures: Seq[Picture] = Seq())

case class PictureIdScore(id: Int, score: Double)

object PictureIdScore {
  implicit val implicitWrites: Writes[PictureIdScore] {
    def writes(o: PictureIdScore): JsValue
  } = new Writes[PictureIdScore] {
    override def writes(o: PictureIdScore): JsValue = {
      Json.obj(
        "pictureId" -> o.id,
        "score" -> o.score
      )
    }
  }
}

case class QuestionnaireScores(questionnaire: QuestionnaireWithPictures, userId: Int, pictureIdScores: Seq[PictureIdScore])

trait QuestionnaireRepository {
  def addQuestionnaire(text: String, pictureIds: Seq[Int] = List()): Future[Int]

  def getQuestionnaireById(questId: Int): Future[Option[QuestionnaireWithPictures]]

  def getAllQuestionnaires: Future[Seq[QuestionnaireWithPictures]]
}

trait QuestionnaireAnswerRepository {
  def addQuestionnaireAnswer(questId: Int, userId: Int, pictureIdScores: Seq[PictureIdScore]): Future[Unit.type]

  def getQuestionnaireAnswer(questId: Int, userId: Int): Future[Option[QuestionnaireScores]]
}

@Singleton
class QuestionnaireRepositoryImpl @Inject()(dbWrapper: PostgresService) extends QuestionnaireRepository with QuestionnaireAnswerRepository {

  import dbWrapper.db

  val questionnaireTable = TableQuery[QuestionnaireTable]
  val questionnairePictureTable = TableQuery[QuestionnairePictureTable]
  val questionnaireScoreTable = TableQuery[QuestionnaireScoreTable]
  val insertQuestionnaireTable = questionnaireTable returning questionnaireTable.map(_.id) into ((q, id) => q.copy(id = id))


  def addQuestionnaire(text: String, pictureIds: Seq[Int] = List()): Future[Int] = {
    for {
      q <- db.run(insertQuestionnaireTable += Questionnaire(0, text))
      qps = pictureIds.map { pid => QuestionnairePicture(q.id, pid) }
      _ <- db.run(questionnairePictureTable ++= qps)
    } yield q.id
  }

  def getAllQuestionnaires: Future[Seq[QuestionnaireWithPictures]] = {
    val pics = questionnairePictureTable
      .join(Pictures.pictures)
      .on(_.picId === _.id)
    val q: QueryBase[Seq[(QuestionnaireTable#TableElementType, Option[(QuestionnairePicture, Picture)])]] =
      questionnaireTable
        .joinLeft(pics)
        .on(_.id === _._1.questId)

    for {
      x: Seq[(Questionnaire, Option[(QuestionnairePicture, Picture)])] <- db.run(q.result)
      ans: immutable.Iterable[QuestionnaireWithPictures] = x.groupBy {
        _._1
      }.map { case (q1, s) =>
        val pics: Seq[Picture] = s.collect { case (_, Some(y)) => y._2 }
        QuestionnaireWithPictures(q1, pics)
      }
    } yield ans.toSeq
  }

  def addQuestionnaireAnswer(questId: Int, userId: Int, pictureIdScores: Seq[PictureIdScore]): Future[Unit.type] = {
    val qss = pictureIdScores.map { case PictureIdScore(pid, s) =>
      QuestionnaireScore(questId, userId, pid, s)
    }
    for {
      _ <- db.run(questionnaireScoreTable ++= qss)
    } yield Unit
  }

  def getQuestionnaireAnswer(questId: Int, userId: Int): Future[Option[QuestionnaireScores]] = {
    val questWithPics: Future[Option[QuestionnaireWithPictures]] = getQuestionnaireById(questId)
    val qPicIdScores = questionnaireScoreTable
      .filter(_.questId === questId)
      .filter(_.userId === userId)
      .map(x => (x.picId, x.score))
    val pictureIdScores: Future[Seq[PictureIdScore]] = db.run(qPicIdScores.result).map(_.map(x => PictureIdScore(x._1, x._2)))

    for {
      oqwp <- questWithPics
      pis <- pictureIdScores
    } yield {
      oqwp.map(QuestionnaireScores(_, userId, pis))
    }

  }

  def getQuestionnaireById(questId: Int): Future[Option[QuestionnaireWithPictures]] = {

    val pics: Query[(QuestionnairePictureTable, PictureTable), (QuestionnairePicture, Picture), Seq] = questionnairePictureTable
      .filter(_.questId === questId)
      .join(Pictures.pictures)
      .on(_.picId === _.id)
    val q: QueryBase[Seq[(Questionnaire, Option[(QuestionnairePicture, Picture)])]] =
      questionnaireTable
        .filter(_.id === questId)
        .joinLeft(pics)
        .on(_.id === _._1.questId)

    for {
      x: Seq[(Questionnaire, Option[(QuestionnairePicture, Picture)])] <- db.run(q.result)
      ans: immutable.Iterable[QuestionnaireWithPictures] = x.groupBy {
        _._1
      }.map { case (q1, s) =>
        val pics: Seq[Picture] = s.collect { case (_, Some(y)) => y._2 }
        QuestionnaireWithPictures(q1, pics)
      }
    } yield ans.headOption
  }
}
