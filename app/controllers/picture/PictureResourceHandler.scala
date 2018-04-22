package controllers.picture


import com.google.inject.Inject
import models._
import models.daos.PictureRepository
import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.{ExecutionContext, Future}

case class PictureResource(url: String)

object PictureResource {

  implicit val implicitWrites: Writes[PictureResource] {
    def writes(picture: PictureResource): JsValue
  } = new Writes[PictureResource] {
    def writes(picture: PictureResource): JsValue = {
      Json.obj(
        "url" -> picture.url
      )
    }
  }

  implicit val implicitReads: Reads[PictureResource] =
    (__ \ "url").format[String] map (url => PictureResource(url))

}

case class PictureSequenceResource(pics: Seq[PictureResource])

object PictureSequenceResource {

  implicit val implicitWrites: Writes[PictureSequenceResource] {
    def writes(pictures: PictureSequenceResource): JsValue
  } = new Writes[PictureSequenceResource] {
    def writes(pictures: PictureSequenceResource): JsValue = {
      Json.obj(
        "pics" -> pictures.pics
      )
    }
  }

  implicit val implicitReads: Reads[PictureSequenceResource] =
    (__ \ "pics").format[Seq[PictureResource]] map (pics => PictureSequenceResource(pics))

}

class PictureResourceHandler @Inject()(pictureRepository: PictureRepository)(implicit ec: ExecutionContext){

  def create(pictures: PictureSequenceResource): Future[Seq[Int]] = {
    val res = pictures.pics.map( picture =>
      pictureRepository.add(picUrl = picture.url)
    )
    Future.sequence(res)
  }

}
