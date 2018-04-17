package controllers.questionnaire

import com.google.inject.Inject
import models._
import models.daos.QuestionnaireRepository
import play.api.libs.json.{JsValue, Json, Writes}

import scala.concurrent.{ExecutionContext, Future}

case class QuestionnaireResource(id: Int, text: String, pictures: Seq[Picture])

object QuestionnaireResource {

  implicit val implicitWrites: Writes[QuestionnaireResource] {
    def writes(qr: QuestionnaireResource): JsValue
  } = new Writes[QuestionnaireResource] {
    def writes(qr: QuestionnaireResource): JsValue = {
      Json.obj(
        "id" -> qr.id,
        "text" -> qr.text,
        "pictures" -> qr.pictures
      )
    }
  }

}

class QuestionnaireResourceHandler @Inject()(questionnaireRepository: QuestionnaireRepository)(implicit ec: ExecutionContext) {
  def create(questionnaire: QuestionnaireFormInput): Future[QuestionnaireResource] = {
    questionnaireRepository.addQuestionnaire(questionnaire.text, questionnaire.pictureIds).flatMap(get)
  }

  def get(questionnaireId: Int): Future[QuestionnaireResource] = {
    for {
      maybeQuest <- questionnaireRepository.getQuestionnaireById(questionnaireId)
      q = maybeQuest.get
    } yield QuestionnaireResource(q.base.id, q.base.text, q.pictures)
  }
}