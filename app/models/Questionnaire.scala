package models

import slick.jdbc.PostgresProfile.api._
import slick.lifted.QueryBase

import scala.collection.immutable
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

case class Questionnaire(id: Int, text: String)

case class QuestionnairePicture(questId: Int, picId: Int)

case class QuestionnaireScore(questId: Int, userId: Int, picId: Int, score: Double)

case class QuestionnaireWithPictures(base: Questionnaire, pictures: Seq[Picture] = Seq())

case class PictureIdScore(id: Int, score: Double)

case class QuestionnaireScores(questionnaire: QuestionnaireWithPictures, userId: Int, pictureIdScores: Seq[PictureIdScore])


object QuestionnaireDb {

  val db = Database.forConfig("neonDb")
  val questionnaireTable = TableQuery[QuestionnaireTable]
  val questionnairePictureTable = TableQuery[QuestionnairePictureTable]
  val questionnaireScoreTable = TableQuery[QuestionnaireScoreTable]
  val insertQuestionnaireTable = questionnaireTable returning questionnaireTable.map(_.id) into ((q, id) => q.copy(id = id))

  def addQuestionnaire(text: String, pictureIds: List[Int] = List()): Future[Unit.type] = {
    for {
      q <- db.run(insertQuestionnaireTable += Questionnaire(0, text))
      qps = pictureIds.map { pid => QuestionnairePicture(q.id, pid) }
      _ <- db.run(questionnairePictureTable ++= qps)
    } yield Unit
  }

  def getAllQuestionnaires: Future[Seq[QuestionnaireWithPictures]] = {
    val pics = questionnairePictureTable
      .join(Pictures.pictures)
      .on(_.picId === _.id)
    val q: QueryBase[Seq[(QuestionnaireDb.QuestionnaireTable#TableElementType, Option[(QuestionnairePicture, Picture)])]] =
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

  def addScore(questId: Int, userId: Int, pictureIdScores: Seq[PictureIdScore]): Future[Unit.type] = {
    val qss = pictureIdScores.map { case PictureIdScore(pid, s) =>
      QuestionnaireScore(questId, userId, pid, s)
    }
    for {
      _ <- db.run(questionnaireScoreTable ++= qss)
    } yield Unit
  }

  class QuestionnaireTable(tag: Tag) extends Table[Questionnaire](tag, "questionnaire") {
    def * = (id, text) <> (Questionnaire.tupled, Questionnaire.unapply)

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def text = column[String]("text")
  }

  class QuestionnairePictureTable(tag: Tag) extends Table[QuestionnairePicture](tag, "questionnaire_picture") {
    def * = (questId, picId) <> (QuestionnairePicture.tupled, QuestionnairePicture.unapply)

    def questId = column[Int]("quest_id")

    def picId = column[Int]("pic_id")
  }

  class QuestionnaireScoreTable(tag: Tag) extends Table[QuestionnaireScore](tag, "questionnaire_score") {
    def * = (questId, userId, picId, score) <> (QuestionnaireScore.tupled, QuestionnaireScore.unapply)

    def questId = column[Int]("quest_id")

    def userId = column[Int]("user_id")

    def picId = column[Int]("pic_id")

    def score = column[Double]("score")
  }

}

