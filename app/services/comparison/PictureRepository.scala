package services.comparison

import com.google.inject.{Inject, Singleton}
import models.{Picture, PictureTable}
import services.DbService
import slick.jdbc.PostgresProfile.api._
import slick.lifted.TableQuery

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class PictureRepository @Inject()(dbWrapper: DbService) {

  val db = dbWrapper.db
  val pictures = TableQuery[PictureTable]

  def fromPicture(p: Picture): Picture = Picture(p.id, p.picUrl)

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
