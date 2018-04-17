package services.user

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test._

class UserControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "UserController POST" should {
    "create and return user resource" in {
      val controller = inject[UserController]
      val jsonUser = Json.parse(
        """{
          |"login": "mockUser",
          |"password" : "mockPassword",
          |"eMail" : "mockEMail"
          |}
        """.stripMargin)

      val request = FakeRequest(POST, "/").withJsonBody(jsonUser)
      val response = controller.addUser().apply(request)

      status(response) mustBe CREATED
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("\"login\":\"mockUser\"")
      println(contentAsString(response))

    }

    "return failure on incorrect input" in {
      val controller = inject[UserController]
      val jsonUser = Json.parse("{ \"login\" : 123 }")

      val request = FakeRequest(POST, "/").withJsonBody(jsonUser)
      val response = controller.addUser().apply(request)

      status(response) mustBe BAD_REQUEST
      contentType(response) mustBe Some("text/plain")
      contentAsString(response) must include("Detected error")
      println(contentAsString(response))

    }
  }

  "UserController GET" should {
    "return user resource" in {
      val controller = inject[UserController]
      val response = controller.getUser("testUser").apply(FakeRequest(GET, "/"))

      status(response) mustBe OK
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("\"login\"")
      println(contentAsString(response))

    }
  }
}