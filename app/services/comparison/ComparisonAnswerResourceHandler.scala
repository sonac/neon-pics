package services.comparison


import com.google.inject.Inject
import play.api.libs.json.{JsValue, Json, Writes}

import scala.concurrent.{ExecutionContext, Future}
import models._

case class ComparisonAnswerResource(questionnaireId: Int, userId: Int, scores: Seq[PictureIdScore])

object ComparisonAnswerResource {

  implicit val implicitWrites: Writes[ComparisonAnswerResource] {
    def writes(o: ComparisonAnswerResource): JsValue
  } = new Writes[ComparisonAnswerResource] {
    override def writes(o: ComparisonAnswerResource): JsValue = {
      Json.obj(
        "questionnaireId" -> o.questionnaireId,
        "userId" -> o.userId,
        "scores" -> o.scores
      )
    }
  }
}

class ComparisonAnswerResourceHandler @Inject()(questionnaireAnswerRepository: QuestionnaireAnswerRepository)(implicit ec: ExecutionContext) {

  def create(questionnaireAnswer: QuestionnaireAnswerFormInput): Future[Unit.type] = {
    val scores = questionnaireAnswer.pictureIdScores.map { case PictureIdScoreFormInput(pid, s) =>
      PictureIdScore(pid, s.toDouble)
    }
    questionnaireAnswerRepository.addQuestionnaireAnswer(questionnaireAnswer.questionnaireId, questionnaireAnswer.userId, scores)
  }
}