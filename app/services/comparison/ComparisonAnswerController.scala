package services.comparison

import com.google.inject.Inject
import controllers.RequestAugmented
import play.api.data.{Form, Mapping}
import play.api.mvc.{Action, AnyContent, Result}

import scala.concurrent.{ExecutionContext, Future}

case class PictureIdScoreFormInput(pictureId: Int, score: BigDecimal)

object PictureIdScoreFormInput {
  val pictureIdScoreFormInput: Mapping[PictureIdScoreFormInput] = {
    import play.api.data.Forms._
    mapping(
      "pictureId" -> number,
      "score" -> bigDecimal
    )(PictureIdScoreFormInput.apply)(PictureIdScoreFormInput.unapply)
  }
}

case class QuestionnaireAnswerFormInput(questionnaireId: Int, userId: Int, pictureIdScores: Seq[PictureIdScoreFormInput])

object QuestionnaireAnswerFormInput {
  val questionnairAnswerFormInput: Form[QuestionnaireAnswerFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "questionnaireId" -> number,
        "userId" -> number,
        "pictureIdScores" -> seq(PictureIdScoreFormInput.pictureIdScoreFormInput)
      )
      (QuestionnaireAnswerFormInput.apply)(QuestionnaireAnswerFormInput.unapply)
    )
  }
}

class ComparisonAnswerController @Inject()(ccc: ComparisonControllerComponents, carh: ComparisonAnswerResourceHandler)(implicit ec: ExecutionContext) extends ComparisonBaseController(ccc) {

  def addComparisonAnswer(): Action[AnyContent] = {

    def failure(badForm: Form[QuestionnaireAnswerFormInput])(implicit request: RequestAugmented[AnyContent]): Future[Result] = {
      Future.successful(BadRequest(badForm.errorsAsJson))
    }

    def success(input: QuestionnaireAnswerFormInput): Future[Result] = {
      carh.create(input).map { _ =>
        Created
      }
    }

    ComparisonActionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      QuestionnaireAnswerFormInput.questionnairAnswerFormInput.bindFromRequest().fold(failure, success)
    }
  }
}
