package controllers.questionnaire

import com.google.inject.Inject
import controllers.{Assets, ControllerComponentsDefault, ControllerDefault, RequestAugmented}
import play.api.Configuration
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class QuestionnaireController @Inject()(ccc: ControllerComponentsDefault,
                                        crh: QuestionnaireResourceHandler,
                                        conf: Configuration,
                                        assets: Assets)
                                       (implicit ec: ExecutionContext) extends ControllerDefault(ccc, assets) {

  private val secretKey = conf.get[String]("play.http.secret.key")

  def getQuestionnaire(questionnaireId: Int): Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      crh.get(questionnaireId).map { q =>
        Ok(Json.toJson(q))
      }
    }
  }

  def addQuestionnaire(): Action[AnyContent] = {

    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      val cookies: Cookies = request.cookies
      checkAuth(cookies, secretKey) match {
        case Some(_) => Json.fromJson[QuestionnaireResourceSimplified](request.body.asJson.get) match {
          case JsSuccess(q: QuestionnaireResourceSimplified, _: JsPath) => crh.create(q).map(x => Created(Json.toJson(x.text)))
          case e: JsError => Future(BadRequest("Wrong input " + e))
        }
        case None => Future(Unauthorized("You must be logged in"))
      }
    }
  }

  def getQuestionnaireAll(): Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      crh.getAll.map(sq =>
        Ok(Json.toJson(sq)))
    }
  }


}



