package controllers

import com.google.inject.Inject
import play.api.i18n.MessagesApi
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class RequestAugmented[A](request: Request[A], val messagesApi: MessagesApi) extends WrappedRequest(request) with MessagesRequestHeader with PreferredMessagesProvider

class ActionBuilderParser @Inject()(messagesApi: MessagesApi, playBodyParsers: PlayBodyParsers)
                                   (implicit val executionContext: ExecutionContext)
  extends ActionBuilder[RequestAugmented, AnyContent] {
  type ComparisonRequestBlock[A] = RequestAugmented[A] => Future[Result]

  override def parser: BodyParser[AnyContent] = playBodyParsers.anyContent

  override def invokeBlock[A](request: Request[A], block: RequestAugmented[A] => Future[Result]): Future[Result] = {
    block(new RequestAugmented(request, messagesApi))
  }
}