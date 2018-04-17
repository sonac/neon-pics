package models.daos

import com.google.inject.{Inject, Singleton}
import models.Picture
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}

trait PictureRepository {
  def add(pic: Picture): Future[String]

  def delete(id: Int): Future[Int]

  def get(id: Int): Future[Option[Picture]]

  def getAll: Future[Seq[String]]
}

@Singleton
class PictureRepositoryImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends PictureRepository
    with DAOSlick {

  import profile.api._

  def add(pic: Picture): Future[String] = {
    db.run(pictureTable += pic).map(res => "Picture added to DB").recover {
      case ex: Exception => ex.getCause.getMessage
    }
  }

  def delete(id: Int): Future[Int] = {
    db.run(pictureTable.filter(_.id === id).delete)
  }

  def get(id: Int): Future[Option[Picture]] = {
    db.run(pictureTable.filter(_.id === id).result.headOption)
  }

  def getAll: Future[Seq[String]] = {
    db.run(pictureTable.map(_.picUrl).result)
  }

}
