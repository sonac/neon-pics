package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Picture(id: Int, picUrl: String)

object Picture {
  implicit val pictureReads: Reads[Picture] = Json.reads[Picture]
  implicit val pictureWrites: OWrites[Picture] = Json.writes[Picture]
}

case class Questionnaire(id: Int, text: String)

case class QuestionnairePicture(questId: Int, picId: Int)

case class QuestionnaireScore(questId: Int, userId: Int, picId: Int, score: Double)

case class PictureIdScore(id: Int, score: Double)

case class PictureScore(id: Int, picUrl: String, score: Double)

case class User(id: Int, login: String, password: String, eMail: String)

case class QuestionnaireScores(questionnaire: QuestionnaireWithPictures, userId: Int, pictureIdScores: Seq[PictureIdScore])

case class QuestionnaireScoreWithUser(questId: Int, userName: String, pictureIdScores: Seq[PictureIdScore])

case class QuestionnairePictureScores(questId: Int, pictureScores: Seq[PictureScore])

case class QuestionnaireWithPictures(base: Questionnaire, pictures: Seq[Picture] = Seq())


object PictureIdScore {

  implicit val implicitFormat: Format[PictureIdScore] = (
    (__ \ "pictureId").format[Int] and
      (__ \ "score").format[Double]
    )(PictureIdScore.apply, unlift(PictureIdScore.unapply))

}

object PictureScore {
  implicit val implicitFormat: Format[PictureScore] = (
    (__ \ "id").format[Int] and
      (__ \ "picUrl").format[String] and
      (__ \ "score").format[Double]
  )(PictureScore.apply, unlift(PictureScore.unapply))
}
