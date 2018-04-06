package services.user

import com.google.inject.Inject
import play.api.http.FileMimeTypes
import play.api.i18n.{Langs, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class UserController @Inject() (ucc: UserControllerComponents)
                               (implicit ec: ExecutionContext)
                     extends UserBaseController(ucc) {

  def getUser(userLogin: String): Action[AnyContent] = {
    UserActionBuilder.async { implicit request: UserRequest[AnyContent] =>
      ucc.userResourceHandler.get(userLogin).map { u =>
        Ok(Json.toJson(u))
      }
    }
  }

  def addUser(): Action[AnyContent] = {
    UserActionBuilder.async { implicit request: UserRequest[AnyContent] =>
      println(request.body)
      Future(Ok("Oh hi, Mark!"))
    }
  }

}

case class UserControllerComponents @Inject() (userActionBuilder: UserActionBuilder,
                                               userResourceHandler: UserResourceHandler,
                                               actionBuilder: DefaultActionBuilder,
                                               parsers: PlayBodyParsers,
                                               messagesApi: MessagesApi,
                                               langs: Langs,
                                               fileMimeTypes: FileMimeTypes,
                                               executionContext: ExecutionContext) extends ControllerComponents

class UserBaseController @Inject() (ucc: UserControllerComponents) extends BaseController {

  def UserActionBuilder: UserActionBuilder = ucc.userActionBuilder

  override protected def controllerComponents: ControllerComponents = ucc

}

/*


case class QuestionnaireFormInput(text: String, pictureIds: Seq[Int] = Seq())

class ComparisonController @Inject()(ccc: ComparisonControllerComponents)(implicit ec: ExecutionContext) extends ComparisonBaseController(ccc) {

  def addQuestionnaire(): Action[AnyContent] = {

    def failure(badForm: Form[QuestionnaireFormInput])(implicit request: ComparisonRequest[AnyContent]) = {
      Future.successful(BadRequest(badForm.errorsAsJson))
    }

    def success(input: QuestionnaireFormInput) = {
      ccc.comparisonResourceHandler.create(input).map { q =>
        Created(Json.toJson(q))
      }
    }

    ComparisonActionBuilder.async { implicit request: ComparisonRequest[AnyContent] =>
      questionnaireFormInput.bindFromRequest().fold(failure, success)
    }
  }

}
 */