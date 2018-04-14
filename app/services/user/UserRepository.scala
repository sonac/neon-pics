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
  val inserUserTable = userTable returning userTable.map(_.id) into ((u, id) => u.copy(id = id))


  def addUser(id: Int = 0, login: String, password: String, eMail: String): Future[User] = {
    db.run(inserUserTable += User(id, login, password, eMail))
  }

  def getUserByLogin(userLogin: String): Future[Option[User]] = {
    db.run(userTable.filter(_.login === userLogin).result.headOption)
  }

}
