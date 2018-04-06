package services.user

import com.google.inject.{Inject, Singleton}
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import models._
import services.DbService

@Singleton
class UserRepository @Inject()(dbWrapper: DbService) {

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
