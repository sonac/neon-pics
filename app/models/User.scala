package models

import slick.jdbc.PostgresProfile.api._

case class User(login: String, password: String, eMail: String)

class UserTable(tag: Tag) extends Table[User](tag, "user") {

  def * = (login, password, eMail) <> (User.tupled, User.unapply)

  def login = column[String]("login", O.PrimaryKey)

  def password = column[String]("password")

  def eMail = column[String]("email")

}

