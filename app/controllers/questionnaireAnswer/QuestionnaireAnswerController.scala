package controllers.questionnaireAnswer

import com.google.inject.Inject
import controllers.{ControllerComponentsDefault, ControllerDefault, RequestAugmented}
import play.api.data.Form
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, Result}

import scala.concurrent.{ExecutionContext, Future}

class QuestionnaireAnswerController @Inject()(ccc: ControllerComponentsDefault, carh: QuestionnaireAnswerResourceHandler)(implicit ec: ExecutionContext) extends ControllerDefault(ccc) {

  def addQuestionnaireAnswer(): Action[AnyContent] = {

    def failure(badForm: Form[QuestionnaireAnswerFormInput])(implicit request: RequestAugmented[AnyContent]): Future[Result] = {
      Future.successful(BadRequest(badForm.errorsAsJson))
    }

    def success(input: QuestionnaireAnswerFormInput): Future[Result] = {
      carh.create(input).map { _ =>
        Created
      }
    }

    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      QuestionnaireAnswerFormInput.form.bindFromRequest().fold(failure, success)
    }
  }

  def getAllQuestionnaireAnswers: Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      carh.getAll.map(x => Ok(Json.toJson(x)))
    }
  }

}
