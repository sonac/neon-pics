package services.comparison

import com.google.inject.Inject
import play.api.data.{Form, Mapping}
import play.api.http.FileMimeTypes
import play.api.i18n.{Langs, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

case class QuestionnaireFormInput(text: String, pictureIds: Seq[Int] = Seq())

class ComparisonController @Inject()(ccc: ComparisonControllerComponents)(implicit ec: ExecutionContext) extends ComparisonBaseController(ccc) {

  private val questionnaireFormInput: Form[QuestionnaireFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "text" -> text,
        "pictureIds" -> seq(number)
      )(QuestionnaireFormInput.apply)(QuestionnaireFormInput.unapply)
    )
  }

  def getQuestionnaire(questionnaireId: Int): Action[AnyContent] = {

    ComparisonActionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      ccc.comparisonResourceHandler.get(questionnaireId).map { q =>
        Ok(Json.toJson(q))
      }
    }
  }

  def addQuestionnaire(): Action[AnyContent] = {

    def failure(badForm: Form[QuestionnaireFormInput])(implicit request: RequestAugmented[AnyContent]) = {
      Future.successful(BadRequest(badForm.errorsAsJson))
    }

    def success(input: QuestionnaireFormInput) = {
      ccc.comparisonResourceHandler.create(input).map { q =>
        Created(Json.toJson(q))
      }
    }

    ComparisonActionBuilder.async { implicit request: RequestAugmented[AnyContent] =>
      questionnaireFormInput.bindFromRequest().fold(failure, success)
    }
  }

}

case class ComparisonControllerComponents @Inject()(comparisonActionBuilder: ActionBuilderParser,
                                                    comparisonResourceHandler: ComparisonResourceHandler,
                                                    actionBuilder: DefaultActionBuilder,
                                                    parsers: PlayBodyParsers,
                                                    messagesApi: MessagesApi,
                                                    langs: Langs,
                                                    fileMimeTypes: FileMimeTypes,
                                                    executionContext: scala.concurrent.ExecutionContext)
  extends ControllerComponents

class ComparisonBaseController @Inject()(ccc: ComparisonControllerComponents) extends BaseController {
  def ComparisonActionBuilder: ActionBuilderParser = ccc.comparisonActionBuilder

  override protected def controllerComponents: ControllerComponents = ccc

  //  def comparisonResource

  //  def postResourceHandler: PostResourceHandler = pcc.postResourceHandler
}

//
//
//package v1.post
//
//import javax.inject.Inject
//
//import play.api.Logger
//import play.api.data.Form
//import play.api.libs.json.Json
//import play.api.mvc._
//
//import scala.concurrent.{ExecutionContext, Future}
//
//case class PostFormInput(title: String, body: String)
//
///**
//  * Takes HTTP requests and produces JSON.
//  */
//class PostController @Inject()(cc: PostControllerComponents)(implicit ec: ExecutionContext)
//  extends PostBaseController(cc) {
//
//  private val logger = Logger(getClass)
//
//  private val form: Form[PostFormInput] = {
//    import play.api.data.Forms._
//
//    Form(
//      mapping(
//        "title" -> nonEmptyText,
//        "body" -> text
//      )(PostFormInput.apply)(PostFormInput.unapply)
//    )
//  }
//
//  def index: Action[AnyContent] = PostAction.async { implicit request =>
//    logger.trace("index: ")
//    postResourceHandler.find.map { posts =>
//      Ok(Json.toJson(posts))
//    }
//  }
//
//  def process: Action[AnyContent] = PostAction.async { implicit request =>
//    logger.trace("process: ")
//    processJsonPost()
//  }
//
//  def show(id: String): Action[AnyContent] = PostAction.async { implicit request =>
//    logger.trace(s"show: id = $id")
//    postResourceHandler.lookup(id).map { post =>
//      Ok(Json.toJson(post))
//    }
//  }
//
//  private def processJsonPost[A]()(implicit request: PostRequest[A]): Future[Result] = {
//    def failure(badForm: Form[PostFormInput]) = {
//      Future.successful(BadRequest(badForm.errorsAsJson))
//    }
//
//    def success(input: PostFormInput) = {
//      postResourceHandler.create(input).map { post =>
//        Created(Json.toJson(post)).withHeaders(LOCATION -> post.link)
//      }
//    }
//
//    form.bindFromRequest().fold(failure, success)
//  }
//}

