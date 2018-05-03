package controllers.questionnaire

import com.google.inject.Inject
import models._
import models.daos.QuestionnaireRepository
import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.{ExecutionContext, Future}

case class QuestionnaireResource(id: Int, text: String, pictures: Seq[Picture])

object QuestionnaireResource {
  /*
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
  }*/

  implicit val implicitFormat: Format[QuestionnaireResource] = (
    (__ \ "id").format[Int] and
      (__ \ "text").format[String] and
      (__ \ "pictures").format[Seq[Picture]]
  )(QuestionnaireResource.apply, unlift(QuestionnaireResource.unapply))

}

case class QuestionnaireResourceSimplified(text: String, pictureIds: Seq[Int])

object QuestionnaireResourceSimplified {
  implicit val implicitFormat: Format[QuestionnaireResourceSimplified] = (
    (__ \ "text").format[String] and
      (__ \ "pictureIds").format[Seq[Int]]
  )(QuestionnaireResourceSimplified.apply, unlift(QuestionnaireResourceSimplified.unapply))
}


class QuestionnaireResourceHandler @Inject()(questionnaireRepository: QuestionnaireRepository)(implicit ec: ExecutionContext) {

  def create(questionnaire: QuestionnaireResourceSimplified): Future[QuestionnaireResource] = {
    questionnaireRepository.addQuestionnaire(questionnaire.text, questionnaire.pictureIds).flatMap(get)
  }

  def get(questionnaireId: Int): Future[QuestionnaireResource] = {
    for {
      maybeQuest <- questionnaireRepository.getQuestionnaireById(questionnaireId)
      q = maybeQuest.get
    } yield QuestionnaireResource(q.base.id, q.base.text, q.pictures)
  }

  def getAll: Future[Seq[QuestionnaireResource]] = {
    questionnaireRepository.getQuestionnaireAll.map(sq =>
      sq.map(q =>
      QuestionnaireResource(q.base.id, q.base.text, q.pictures)))
  }
}