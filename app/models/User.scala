package models

import slick.jdbc.PostgresProfile.api._

case class User(id: Int, login: String, password: String, eMail: String)

class UserTable(tag: Tag) extends Table[User](tag, "user") {

  def * = (id, login, password, eMail) <> (User.tupled, User.unapply)

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def login = column[String]("login", O.Unique)

  def password = column[String]("password", O.Unique)

  def eMail = column[String]("email")

}

