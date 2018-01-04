package controllers

import com.google.inject.Inject
import play.api.http.FileMimeTypes
import play.api.i18n.{Langs, MessagesApi}
import play.api.mvc.{BaseController, ControllerComponents, PlayBodyParsers}

class ControllerDefault @Inject()(ccc: ControllerComponentsDefault) extends BaseController {
  override protected def controllerComponents: ControllerComponents = ccc
}

case class ControllerComponentsDefault @Inject()(actionBuilder: ActionBuilderDefault,
                                                 parsers: PlayBodyParsers,
                                                 messagesApi: MessagesApi,
                                                 langs: Langs,
                                                 fileMimeTypes: FileMimeTypes,
                                                 executionContext: scala.concurrent.ExecutionContext)
  extends ControllerComponents
