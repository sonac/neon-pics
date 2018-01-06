package models.daos

import com.google.inject.{Inject, Singleton}
import models._
import play.api.db.slick.DatabaseConfigProvider

import scala.collection.immutable
import scala.concurrent.{ExecutionContext, Future}

trait QuestionnaireRepository {
  def addQuestionnaire(text: String, pictureIds: Seq[Int] = List()): Future[Int]

  def getQuestionnaireById(questId: Int): Future[Option[QuestionnaireWithPictures]]

  def getQuestionnaireAll: Future[Seq[QuestionnaireWithPictures]]
}

trait QuestionnaireAnswerRepository {
  def addQuestionnaireAnswer(questId: Int, userId: Int, pictureIdScores: Seq[PictureIdScore]): Future[Unit.type]

  def getQuestionnaireAnswer(questId: Int, userId: Int): Future[Option[QuestionnaireScores]]
}

@Singleton
class QuestionnaireRepositoryImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends QuestionnaireRepository
    with QuestionnaireAnswerRepository
    with DAOSlick {

  import profile.api._

  def addQuestionnaire(text: String, pictureIds: Seq[Int] = List()): Future[Int] = {
    for {
      q <- db.run(insertQuestionnaireTable += Questionnaire(0, text))
      qps = pictureIds.map { pid => QuestionnairePicture(q.id, pid) }
      _ <- db.run(questionnairePictureTable ++= qps)
    } yield q.id
  }

  def getQuestionnaireById(questId: Int): Future[Option[QuestionnaireWithPictures]] = {
    val q = questionnaireTable
      .filter(_.id === questId)
      .joinLeft(questionnairePictures)
      .on(_.id === _._1.questId)

    for {
      x <- db.run(q.result)
      ans: immutable.Iterable[QuestionnaireWithPictures] = x.groupBy {
        _._1
      }.map { case (q1, s) =>
        val pics: Seq[Picture] = s.collect { case (_, Some(y)) => y._2 }
        QuestionnaireWithPictures(q1, pics)
      }
    } yield ans.headOption
  }

  def getQuestionnaireAll: Future[Seq[QuestionnaireWithPictures]] = {
    val q =
      questionnaireTable
        .joinLeft(questionnairePictures)
        .on(_.id === _._1.questId)

    for {
      x <- db.run(q.result)
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

}
