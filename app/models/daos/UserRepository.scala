package models.daos

import com.google.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.PostgresProfile.api._
import models._

import scala.concurrent.Future

@Singleton
class UserRepository @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) extends DAOSlick {

  val insertUserTable = userTable returning userTable.map(_.id) into ((u, id) => u.copy(id = id))

  def addUser(id: Int = 0, login: String, password: String, eMail: String): Future[User] = {
    db.run(insertUserTable += User(id, login, password, eMail))
  }

  def getUserByLogin(userLogin: String): Future[Option[User]] = {
    db.run(userTable.filter(_.login === userLogin).result.headOption)
  }

}
