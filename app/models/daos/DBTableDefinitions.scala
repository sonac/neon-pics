package models.daos

import models._
import slick.jdbc.JdbcProfile

trait DBTableDefinitions{

  protected val driver: JdbcProfile
  import driver.api._

  class PictureTable(tag: Tag) extends Table[Picture](tag, "pictures") {

    def * = (id, picUrl) <> ((Picture.apply _).tupled, Picture.unapply)

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def picUrl = column[String]("pic_url")

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

  class UserTable(tag: Tag) extends Table[User](tag, "user") {

    def * = (id, login, password, eMail) <> (User.tupled, User.unapply)

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

    def login = column[String]("login", O.Unique)

    def password = column[String]("password", O.Unique)

    def eMail = column[String]("email")

  }


  val pictureTable: TableQuery[PictureTable] = TableQuery[PictureTable]
  val questionnaireTable: TableQuery[QuestionnaireTable] = TableQuery[QuestionnaireTable]
  val questionnairePictureTable: TableQuery[QuestionnairePictureTable] = TableQuery[QuestionnairePictureTable]
  val questionnaireScoreTable: TableQuery[QuestionnaireScoreTable] = TableQuery[QuestionnaireScoreTable]
  val userTable: TableQuery[UserTable] = TableQuery[UserTable]
  val insertQuestionnaireTable: driver.IntoInsertActionComposer[Questionnaire, Questionnaire] = questionnaireTable returning questionnaireTable.map(_.id) into ((q, id) => q.copy(id = id))

  val schema: driver.DDL = pictureTable.schema ++ questionnaireTable.schema ++ questionnairePictureTable.schema ++ questionnaireScoreTable.schema

  val questionnairePictures = questionnairePictureTable
    .join(pictureTable)
    .on(_.picId === _.id)
}
