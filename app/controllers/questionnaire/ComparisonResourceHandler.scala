package controllers.questionnaire

import com.google.inject.Inject
import models.{Picture, _}
import play.api.libs.json.{JsValue, Json, Writes}

import scala.concurrent.{ExecutionContext, Future}

case class ComparisonResource(id: Int, text: String, pictures: Seq[Picture])

object ComparisonResource {

  implicit val implicitWrites: Writes[ComparisonResource] {
    def writes(comparison: ComparisonResource): JsValue
  } = new Writes[ComparisonResource] {
    def writes(comparison: ComparisonResource): JsValue = {
      Json.obj(
        "id" -> comparison.id,
        "text" -> comparison.text,
        "pictures" -> comparison.pictures
      )
    }
  }

}

class ComparisonResourceHandler @Inject()(questionnaireRepository: QuestionnaireRepository)(implicit ec: ExecutionContext) {
  def create(questionnaire: QuestionnaireFormInput): Future[ComparisonResource] = {
    questionnaireRepository.addQuestionnaire(questionnaire.text, questionnaire.pictureIds).flatMap(get)
  }

  def get(questionnaireId: Int): Future[ComparisonResource] = {
    for {
      maybeQuest <- questionnaireRepository.getQuestionnaireById(questionnaireId)
      q = maybeQuest.get
    } yield ComparisonResource(q.base.id, q.base.text, q.pictures)
  }
}