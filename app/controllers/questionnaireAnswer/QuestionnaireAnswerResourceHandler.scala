package controllers.questionnaireAnswer

import com.google.inject.Inject
import models._
import models.daos.QuestionnaireAnswerRepository
import play.api.libs.json.{JsValue, Json, Writes}

import scala.concurrent.{ExecutionContext, Future}

case class QuestionnaireAnswerResource(questionnaireId: Int, userId: Int, scores: Seq[PictureIdScore])

object QuestionnaireAnswerResource {

  implicit val implicitWrites: Writes[QuestionnaireAnswerResource] {
    def writes(o: QuestionnaireAnswerResource): JsValue
  } = new Writes[QuestionnaireAnswerResource] {
    override def writes(o: QuestionnaireAnswerResource): JsValue = {
      Json.obj(
        "questionnaireId" -> o.questionnaireId,
        "userId" -> o.userId,
        "scores" -> o.scores
      )
    }
  }
}

class QuestionnaireAnswerResourceHandler @Inject()(questionnaireAnswerRepository: QuestionnaireAnswerRepository)(implicit ec: ExecutionContext) {

  def create(questionnaireAnswer: QuestionnaireAnswerFormInput): Future[Unit.type] = {
    val scores = questionnaireAnswer.pictureIdScores.map { case PictureIdScoreFormInput(pid, s) =>
      PictureIdScore(pid, s.toDouble)
    }
    questionnaireAnswerRepository.addQuestionnaireAnswer(questionnaireAnswer.questionnaireId, questionnaireAnswer.userId, scores)
  }
}