package services.user

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json._
import play.api.mvc._
import play.api.mvc.Results.Ok
import play.api.test.Helpers._
import play.api.test._

import scala.concurrent.{ExecutionContext, Future}

class UserActionBuilderTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "UserActionBuilder" should {
    "create and return created user" in {
      import ExecutionContext.Implicits.global

      val userActionBuilder = inject[UserActionBuilder]
      val ucc = inject[UserControllerComponents]

      val jsonUser = Json.parse(
        """{
          |"login": "mockUser",
          |"password" : "mockPassword",
          |"email" : "mockEMail"
          |}
        """.stripMargin)

      val postRequest = FakeRequest(POST, "/").withJsonBody(jsonUser)

      userActionBuilder.async { implicit request: UserRequest[AnyContent] =>
        val userFromJson: JsResult[UserResource] = Json.fromJson[UserResource](request.body.asJson.get)
        userFromJson match {
          case JsSuccess(usr: UserResource, path: JsPath) => ucc.userResourceHandler.create(usr)
          case e: JsError => println("Error: " + JsError.toJson(e).toString)
        }
        Future(Ok(""))
      }.apply(postRequest)

      val getRequest = FakeRequest(GET, "/")

      userActionBuilder.async { implicit request: UserRequest[AnyContent] =>
        ucc.userResourceHandler.get("mockUser").map { u =>
          u mustBe UserResource("mockUser", "mockPassword", "mockEMail")
          Ok(Json.toJson(u))
        }
      }.apply(getRequest)
    }
  }

}