package models

import com.google.inject.{Inject, Singleton}
import slick.jdbc.PostgresProfile.api._
import play.api.libs.json._
import services.DbService

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

case class Picture(id: Int, picUrl: String)

object Picture {
  implicit val pictureReads: Reads[Picture] = Json.reads[Picture]
  implicit val pictureWrites: OWrites[Picture] = Json.writes[Picture]
}

class PictureTable(tag: Tag) extends Table[Picture](tag, "pictures") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def picUrl = column[String]("pic_url")
  def * = (id, picUrl) <> ((Picture.apply _).tupled, Picture.unapply)

}

@Singleton
class Pictures @Inject()(dbWrapper: DbService){

  def fromPicture(p: Picture): Picture = Picture(p.id, p.picUrl)

  val db = dbWrapper.db
  val pictures = TableQuery[PictureTable]

  def add(pic: Picture): Future[String] = {
      db.run(pictures += pic).map(res => "Picture added to DB").recover {
        case ex: Exception => ex.getCause.getMessage
      }
  }

  def delete(id: Int): Future[Int] = {
    db.run(pictures.filter(_.id === id).delete)
  }

  def get(id: Int): Future[Option[Picture]] = {
    db.run(pictures.filter(_.id === id).result.headOption)
  }

  def getAll: Future[Seq[String]] = {
    db.run(pictures.map(_.picUrl).result)
  }

}