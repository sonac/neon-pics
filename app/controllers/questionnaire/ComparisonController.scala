package controllers.questionnaire

import com.google.inject.Inject
import controllers.{ControllerComponentsDefault, ControllerDefault, RequestAugmented}
import play.api.data.Form
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class ComparisonController @Inject()(ccc: ControllerComponentsDefault, crh: ComparisonResourceHandler)(implicit ec: ExecutionContext) extends ControllerDefault(ccc) {

  private val questionnaireFormInput: Form[QuestionnaireFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "text" -> text,
        "pictureIds" -> seq(number)
      )(QuestionnaireFormInput.apply)(QuestionnaireFormInput.unapply)
    )
  }

  def getQuestionnaire(questionnaireId: Int): Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      crh.get(questionnaireId).map { q =>
        Ok(Json.toJson(q))
      }
    }
  }

  def addQuestionnaire(): Action[AnyContent] = {

    def failure(badForm: Form[QuestionnaireFormInput])(implicit request: RequestAugmented[AnyContent]) = {
      Future.successful(BadRequest(badForm.errorsAsJson))
    }

    def success(input: QuestionnaireFormInput) = {
      crh.create(input).map { q =>
        Created(Json.toJson(q))
      }
    }

    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      questionnaireFormInput.bindFromRequest().fold(failure, success)
    }
  }

}



