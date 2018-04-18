package controllers.user

import com.google.inject.Inject
import play.api.i18n.MessagesApi
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class UserRequest[A](request: Request[A], val messagesApi: MessagesApi) extends WrappedRequest(request)
                                                                           with MessagesRequestHeader
                                                                           with PreferredMessagesProvider

class UserActionBuilder @Inject() (messagesApi: MessagesApi, playBodyParsers: PlayBodyParsers)
                                  (implicit val executionContext: ExecutionContext)
                        extends ActionBuilder[UserRequest, AnyContent] {

  type UserRequestBlock[A] = UserRequest[A] => Future[Result]

  override def parser: BodyParser[AnyContent] = playBodyParsers.anyContent

  override def invokeBlock[A](request: Request[A], block: (UserRequest[A]) => Future[Result]): Future[Result] = {
    block(new UserRequest(request, messagesApi))
  }

}
