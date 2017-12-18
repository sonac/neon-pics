package services

import models._
import scala.concurrent.Future

object PictureService {

  def addPicture(pic: Picture): Future[String] = {
    Pictures.add(pic)
  }

  def deletePicture(id: Int): Future[Int] = {
    Pictures.delete(id)
  }

  def getPicture(id: Int): Future[Option[Picture]] = {
    Pictures.get(id)
  }

  def getAllPictures: Future[Seq[String]] = {
    Pictures.getAll
  }

}
