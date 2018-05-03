package controllers.user

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

import com.google.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import play.api.libs.json._
import play.api.libs.functional.syntax._
import models.daos.UserRepository

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

}

case class UserLoginResource(login: String, password: String)

object UserLoginResource {

  implicit val implicitFormat: Format[UserLoginResource] = (
    (__ \ "login").format[String] and
      (__ \ "password").format[String]
    )(UserLoginResource.apply, unlift(UserLoginResource.unapply))

}

case class UserDataResource(login: String, eMail: String)

object UserDataResource {

  implicit val implicitFormat: Format[UserDataResource] = (
    (__ \ "login").format[String] and
      (__ \ "eMail").format[String]
  )(UserDataResource.apply, unlift(UserDataResource.unapply))

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

  def createAnonymousUser(): Future[String] = {
    val ts = LocalDateTime.now.format(DateTimeFormatter.ofPattern("YYYYMMdd_HHmmssms"))
    Thread.sleep(1000)
    val login = "Anonym_" + ts
    userRepository.addUser(login = login, password = "default", eMail = login + "@default.com")
      .map(_.login)
  }

}
