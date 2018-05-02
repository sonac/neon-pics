package controllers.questionnaireAnswer

import com.google.inject.Inject
import controllers.user.{UserResource, UserResourceHandler}
import controllers.{Assets, ControllerComponentsDefault, ControllerDefault, RequestAugmented}
import pdi.jwt.{Jwt, JwtAlgorithm}
import play.api.data.Form
import play.api.libs.json._
import play.api.mvc._
import play.api.Configuration

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class QuestionnaireAnswerController @Inject()(ccc: ControllerComponentsDefault,
                                              carh: QuestionnaireAnswerResourceHandler,
                                              urh: UserResourceHandler,
                                              conf: Configuration,
                                              assets: Assets)(implicit ec: ExecutionContext)
  extends ControllerDefault(ccc, assets) {

  private val secretKey = conf.get[String]("play.http.secret.key")

  def addQuestionnaireAnswer(): Action[AnyContent] = {

    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      val cookie: Cookies = request.cookies
      val uName = checkAuth(cookie, secretKey) match {
        case Some(usr) => Future(usr.login)
        case None => urh.createAnonymousUser()
      }
      val qAnswerFromJson: JsResult[QuestionnaireAnswerResource] = Json
        .fromJson[QuestionnaireAnswerResource](request.body.asJson.get)
      qAnswerFromJson match {
        case JsSuccess(q: QuestionnaireAnswerResource, _: JsPath) =>
          uName.map(name => {
            carh.create(q, name)
            Created
          })
        case e: JsError => Future(BadRequest("Wrong input " + e))
      }
    }
  }

  def getAllQuestionnaireAnswers: Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      carh.getAll.map(x => Ok(Json.toJson(x)))
    }
  }

  def getQuestAnswer(questionnaireId: Int): Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      val cookies = request.cookies
      checkAuth(cookies, secretKey) match {
        case Some(_) => carh.getQAnswer(questionnaireId).map(x => Ok(Json.toJson(x)))
        case None => Future(Unauthorized("You must be authorized dto access answers"))
      }
    }
  }

  def getAnsweredQuestions: Action[AnyContent] = {
    ccc.actionBuilder.async { implicit request =>
      carh.getAnsweredQuestions.map(x => Ok(Json.toJson(x)))
    }
  }

}
