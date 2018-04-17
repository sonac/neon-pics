package models

import play.api.libs.json._

case class Picture(id: Int, picUrl: String)

object Picture {
  implicit val pictureReads: Reads[Picture] = Json.reads[Picture]
  implicit val pictureWrites: OWrites[Picture] = Json.writes[Picture]
}

case class Questionnaire(id: Int, text: String)

case class QuestionnairePicture(questId: Int, picId: Int)

case class QuestionnaireScore(questId: Int, userId: Int, picId: Int, score: Double)

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

case class QuestionnaireWithPictures(base: Questionnaire, pictures: Seq[Picture] = Seq())