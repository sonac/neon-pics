package controllers

import javax.inject._

import play.api.libs.json._
import play.api.mvc._
import services._

import scala.concurrent.ExecutionContext.Implicits.global

case class CompareResult(gt: Boolean)

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class PictureController @Inject()(cc: ControllerComponents, pictureService: PictureService) extends AbstractController(cc) {

  def getPics: Action[AnyContent] = Action.async { implicit request =>
    pictureService.getAllPictures.map { pic =>
      Ok(Json.toJson(pic))
    }
  }
}
