package controllers.picture

import com.google.inject.Inject
import controllers.{Assets, ControllerComponentsDefault, ControllerDefault, RequestAugmented}
import play.api.data.Form
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}


class PictureController @Inject() (ccc: ControllerComponentsDefault,
                                   crh: PictureResourceHandler,
                                   assets: Assets)
                                  (implicit ec: ExecutionContext) extends ControllerDefault(ccc, assets) {

  def addPictures(): Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      val picsFromJson: JsResult[PictureSequenceResource] = Json.fromJson[PictureSequenceResource](request.body.asJson.get)
      picsFromJson match {
        case JsSuccess(pics: PictureSequenceResource, path: JsPath) => crh.create(pics).map(pSeq => Created(Json.toJson(pSeq)))
            .recover{
              case err => BadRequest("Was detected " + err)
            }
        case e: JsError => Future(BadRequest(JsError.toJson(e)))
      }
    }
  }

}

/*
class QuestionnaireController @Inject()(ccc: ControllerComponentsDefault, crh: QuestionnaireResourceHandler)
                                       (implicit ec: ExecutionContext) extends ControllerDefault(ccc) {

  def getQuestionnaire(questionnaireId: Int): Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      crh.get(questionnaireId).map { q =>
        Ok(Json.toJson(q))
      }
    }
  }
 */