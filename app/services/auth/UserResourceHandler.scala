package services.auth

import com.google.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import models.User

class UserResourceHandler @Inject()(userRepository: UserRepository)(implicit ec: ExecutionContext) {

  def create(user: User): Future[Int] = {
    userRepository.addUser(user.login, user.password, user.eMail)
  }

  def get(userLogin: String): Future[Option[User]] = {
    userRepository.getUserByLogin(userLogin)
  }

}