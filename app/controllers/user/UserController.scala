package controllers.user

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
          }.recover {
            case err => {
              if (err.getMessage.contains("login"))  BadRequest("User with such login exists " + err)
              else if (err.getMessage.contains("email")) BadRequest("User with such email exists " + err)
              else BadRequest("woopsie dupsie " + err)
            }
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
              Ok(Json.toJson(storedUser)).withHeaders(("auth-token", token))
            }
            else Unauthorized("You've entered wrong password")
          }).recover {
            case err => BadRequest("wopsie " + err)
          }
        }
        case e: JsError => Future(BadRequest("Detected error:"+ JsError.toJson(e)))
      }
    }
  }

  def validate(): Action[AnyContent] = Action.async { implicit request =>
    val cookie: Cookies = request.cookies
    Future(cookie.get("auth-token") match {
      case Some(token) => {
        Jwt.decodeRaw(token.value, secretKey, Seq(JwtAlgorithm.HS256)) match {
          case Success(usr) => {
            Json.parse(usr).validate[UserResource] match {
              case JsSuccess(jsUsr: UserResource, path: JsPath) => Ok(Json.toJson(UserDataResource(jsUsr.login, jsUsr.eMail)))
              case e: JsError => Unauthorized("token for invalid user")
            }
          }
          case Failure(err) => Unauthorized("auth token is invalid" + err)
        }
      }
      case None => Unauthorized("auth token is absent")
    })
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