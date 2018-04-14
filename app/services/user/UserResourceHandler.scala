package services.user

import com.google.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.duration._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import models.User

case class UserResource(login: String, password: String, eMail: String)

object UserResource {

  implicit val implicitWrites: Writes[UserResource] {
    def writes(user: UserResource): JsValue
  } = new Writes[UserResource] {
    def writes(user: UserResource): JsValue = {
      Json.obj(
        "login" -> user.login,
        "password" -> user.password,
        "eMail" -> user.eMail
      )
    }
  }

  implicit val implicitReads: Reads[UserResource] = (
    (__ \ "login").read[String] and
    (__ \ "password").read[String] and
    (__ \ "eMail").read[String]
  )(UserResource.apply _)

  /*
  implicit val locationReads: Reads[Location] = (
  (JsPath \ "lat").read[Double] and
  (JsPath \ "long").read[Double]
)(Location.apply _)
   */

}

class UserResourceHandler @Inject()(userRepository: UserRepository)(implicit ec: ExecutionContext) {

  def create(user: UserResource): Future[UserResource] = {
    userRepository.addUser(login = user.login, password = user.password, eMail = user.eMail)
      .map(u => UserResource(u.login, u.password, u.eMail))
  }

  def get(userLogin: String): Future[UserResource] = {
    for {
      optUser <- userRepository.getUserByLogin(userLogin)
      usr = optUser.get
    } yield UserResource(usr.login, usr.password, usr.eMail)
  }

}
