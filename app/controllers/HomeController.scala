package controllers

import javax.inject._

import play.api.libs.json._
import play.api.mvc._
import services._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

case class CompareResult(gt: Boolean)

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
    * Create an Action to render an HTML page.
    *
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getPics: Action[AnyContent] = Action.async { implicit request =>
    PictureService.getAllPictures.map { pic =>
      Ok(Json.toJson(pic))
    }
  }

  def compare(): Action[AnyContent] = Action.async {
    for {
      (ansA, ansB) <- CompareService.compareTwo
    } yield Ok(views.html.compare(ansA, ansB))

  }

  implicit val pictureReads: Reads[CompareResult] = Json.reads[CompareResult]
  implicit val pictureWrites: OWrites[CompareResult] = Json.writes[CompareResult]

  def compareResult(): Action[JsValue] = Action.async(parse.json) { request =>

    println(request.body)

    def compareResultResponseString(x: CompareResult): _root_.play.api.libs.json.JsString = {
      if (x.gt) {
        JsString("You selected left picture")
      } else {
        JsString("You selected right picture")
      }
    }

    val x = request.body.validate[CompareResult].fold(
      errors => {
        BadRequest(errors.toString())
      },
      gt => {
        Ok(compareResultResponseString(gt))
      }
    )

    Future.successful(x)
  }

}
