package controllers

import com.google.inject.Inject
import controllers.user.{UserDataResource, UserResource}
import pdi.jwt.{Jwt, JwtAlgorithm}
import play.api.http.FileMimeTypes
import play.api.i18n.{Langs, MessagesApi}
import play.api.libs.json.{JsError, JsPath, JsSuccess, Json}
import play.api.mvc.{BaseController, ControllerComponents, PlayBodyParsers}
import play.api.mvc._

import scala.util.{Failure, Success}

class ControllerDefault @Inject()(ccc: ControllerComponentsDefault, assets: Assets) extends BaseController {
  override protected def controllerComponents: ControllerComponents = ccc
  def checkAuth(cookies: Cookies, secretKey: String): Option[UserResource] = {
    val asd = cookies.get("auth-token")
    cookies.get("auth-token") match {
      case Some(token) => Jwt.decodeRaw(token.value, secretKey, Seq(JwtAlgorithm.HS256)) match {
          case Success(usr) => Json.parse(usr).validate[UserResource] match {
              case JsSuccess(usr: UserResource, _: JsPath) => Some(usr)
              case _: JsError => None
            }
          case Failure(_) => None
        }
      case None => None
    }
  }
  def loadIndex(id: Int = 0): Action[AnyContent] = Action.async { request =>
    assets.at("/public", "index.html").apply(request)
  }

  def loadIndexSecondary(wildcard: String = ""): Action[AnyContent] = Action.async { request =>

    assets.at("/public", "index.html").apply(request)
  }
}

case class ControllerComponentsDefault @Inject()(actionBuilder: ActionBuilderDefault,
                                                 parsers: PlayBodyParsers,
                                                 messagesApi: MessagesApi,
                                                 langs: Langs,
                                                 fileMimeTypes: FileMimeTypes,
                                                 executionContext: scala.concurrent.ExecutionContext)
  extends ControllerComponents
