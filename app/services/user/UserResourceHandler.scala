package services.user

import com.google.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import models.User
import play.api.libs.json._

case class UserResource(login: String, password: String, eMail: String)

object UserResource {

  implicit val implicitWrites: Writes[UserResource] {
    def writes(user: UserResource): JsValue
  } = new Writes[UserResource] {
    def writes(user: UserResource): JsValue = {
      Json.obj(
        "login" -> user.login,
        "password" -> user.password,
        "email" -> user.eMail
      )
    }
  }

}

class UserResourceHandler @Inject()(userRepository: UserRepository)(implicit ec: ExecutionContext) {

  def create(user: User): Future[Int] = {
    userRepository.addUser(user.login, user.password, user.eMail)
  }

  def get(userLogin: String): Future[UserResource] = {
    for {
      optUser <- userRepository.getUserByLogin(userLogin)
      usr = optUser.get
    } yield UserResource(usr.login, usr.password, usr.eMail)
  }

}

/*

case class ComparisonResource(id: Int, text: String, pictures: Seq[Picture])

object ComparisonResource {

  implicit val implicitWrites: Writes[ComparisonResource] {
    def writes(comparison: ComparisonResource): JsValue
  } = new Writes[ComparisonResource] {
    def writes(comparison: ComparisonResource): JsValue = {
      Json.obj(
        "id" -> comparison.id,
        "text" -> comparison.text,
        "pictures" -> comparison.pictures
      )
    }
  }

}
 */