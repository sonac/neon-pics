package services.auth

import com.google.inject.Inject
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Future

import models._
import services.DbService

trait UserRepository {

  def addUser(login: String, password: String, eMail: String): Future[Int]

  def getUserByLogin(login: String): Future[Option[User]]

}

@Singleton
class UserRepositoryImpl @Inject()(dbWrapper: DbService) extends UserRepository {

  import dbWrapper.db

  val userTable = TableQuery[UserTable]

  def addUser(login: String, password: String, eMail: String): Future[Int] = {
    for {
      u <- db.run(userTable += User(login, password, eMail))
    } yield u
  }

  def getUserByLogin(userLogin: String): Future[Option[User]] = {
    db.run(userTable.filter(_.login === userLogin).result.headOption)
  }

}
