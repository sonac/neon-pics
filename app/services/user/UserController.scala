package services.user

import com.google.inject.Inject
import pdi.jwt.{Jwt, JwtAlgorithm}

import play.api.http.FileMimeTypes
import play.api.i18n.{Langs, MessagesApi}
import play.api.libs.json._
import play.api.mvc._
import play.api.Configuration

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Success, Failure}

class UserController @Inject() (ucc: UserControllerComponents, conf: Configuration)
                               (implicit ec: ExecutionContext)
                     extends UserBaseController(ucc) {

  private val secretKey = conf.get[String]("play.http.secret.key")

  def getUser(userLogin: String): Action[AnyContent] = {
    UserActionBuilder.async { implicit request: UserRequest[AnyContent] =>
      ucc.userResourceHandler.get(userLogin).map { u =>
        Ok(Json.toJson(u))
      }
    }
  }

  def addUser(): Action[AnyContent] = {
    UserActionBuilder.async { implicit request: UserRequest[AnyContent] =>
      val userFromJson: JsResult[UserResource] = Json.fromJson[UserResource](request.body.asJson.get)
      println(request.body.asJson.get)
      userFromJson match {
        case JsSuccess(usr: UserResource, path: JsPath) =>
          ucc.userResourceHandler.create(usr).map { u =>
            Created(Json.toJson(u))
          }
        case e: JsError => Future(BadRequest("Detected error:"+ JsError.toJson(e)))
      }
    }
  }

  def login(): Action[AnyContent] = {
    UserActionBuilder.async { implicit request: UserRequest[AnyContent] =>
      val userFromJson: JsResult[UserLoginResource] = Json.fromJson[UserLoginResource](request.body.asJson.get)
      userFromJson match {
        case JsSuccess(usrLog: UserLoginResource, path: JsPath) => {
          ucc.userResourceHandler.get(usrLog.login).map(storedUser => {
            if (storedUser.password == usrLog.password) {
              val token = Jwt.encode(Json.toJson(storedUser).toString, secretKey, JwtAlgorithm.HS256)
              Ok("oh").withHeaders(("auth-token", token))
            }
            else Unauthorized("hi")
          }).recover {
            case err => BadRequest("wopsie " + err)
          }
        }
        case e: JsError => Future(BadRequest("Detected error:"+ JsError.toJson(e)))
      }
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