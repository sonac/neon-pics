package models

import slick.jdbc.PostgresProfile.api._

case class Questionnaire(id: Int, text: String)

case class QuestionnairePicture(questId: Int, picId: Int)

case class QuestionnaireScore(questId: Int, userId: Int, picId: Int, score: Double)

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
