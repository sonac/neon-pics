package controllers.questionnaireAnswer

import com.google.inject.Inject
import models._
import models.daos.QuestionnaireAnswerRepository
import play.api.libs.json.{JsValue, Json, Writes}

import scala.concurrent.{ExecutionContext, Future}

case class QuestionnaireAnswerResource(questionnaireId: Int, userName: String, scores: Seq[PictureIdScore])

object QuestionnaireAnswerResource {

  implicit val implicitWrites: Writes[QuestionnaireAnswerResource] {
    def writes(o: QuestionnaireAnswerResource): JsValue
  } = new Writes[QuestionnaireAnswerResource] {
    override def writes(o: QuestionnaireAnswerResource): JsValue = {
      Json.obj(
        "questionnaireId" -> o.questionnaireId,
        "userName" -> o.userName,
        "scores" -> o.scores
      )
    }
  }
}

class QuestionnaireAnswerResourceHandler @Inject()(questionnaireAnswerRepository: QuestionnaireAnswerRepository)(implicit ec: ExecutionContext) {

  def create(questionnaireAnswer: QuestionnaireAnswerFormInput): Future[Option[Unit]] = {
    val scores: Seq[PictureIdScore] = questionnaireAnswer.pictureIdScores.map { case PictureIdScoreFormInput(pid, s) =>
      PictureIdScore(pid, s.toDouble)
    }
    questionnaireAnswerRepository.addQuestionnaireAnswer(questionnaireAnswer.questionnaireId, questionnaireAnswer.userName, scores)
  }

  def getAll: Future[Seq[QuestionnaireAnswerResource]] = {
    questionnaireAnswerRepository.getAllAnswers.map(x =>
      x.map( t =>
        QuestionnaireAnswerResource(t.questId, t.userName, t.pictureIdScores)
      )
    )
  }

}