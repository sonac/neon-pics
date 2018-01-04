package services

import com.google.inject.{Inject, Singleton}
import models._

import scala.concurrent.Future

@Singleton
class PictureService @Inject()(pictureRepository: Pictures){

  def addPicture(pic: Picture): Future[String] = {
    pictureRepository.add(pic)
  }

  def deletePicture(id: Int): Future[Int] = {
    pictureRepository.delete(id)
  }

  def getPicture(id: Int): Future[Option[Picture]] = {
    pictureRepository.get(id)
  }

  def getAllPictures: Future[Seq[String]] = {
    pictureRepository.getAll
  }

}
