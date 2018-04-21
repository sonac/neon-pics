package models.daos

import com.google.inject.{Inject, Singleton}
import models.Picture
import play.api.db.slick.DatabaseConfigProvider

import scala.concurrent.{ExecutionContext, Future}

trait PictureRepository {
  def add(id: Int = 0, picUrl: String): Future[Int]

  def delete(id: Int): Future[Int]

  def get(id: Int): Future[Option[Picture]]

  def getAll: Future[Seq[String]]
}

@Singleton
class PictureRepositoryImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext)
  extends PictureRepository
    with DAOSlick {

  import profile.api._

  def add(id: Int = 0, picUrl: String): Future[Int] = {
    db.run(pictureTable += Picture(id, picUrl))
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
