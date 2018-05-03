package controllers.questionnaire

import controllers.user.UserResource
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test._
import play.api.Configuration
import play.api.mvc._
import pdi.jwt.{Jwt, JwtAlgorithm}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import models.daos.UserRepository

import scala.concurrent.Await

class QuestionnaireControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ComparisonController POST" should {

    "create and return the resource" in {
      val controller = inject[QuestionnaireController]
      val usRepo = inject[UserRepository]
      val conf = inject[Configuration]

      val secretKey = conf.get[String]("play.http.secret.key")

      val storedUser = usRepo.getUserByLogin("testUser")

      val jwt = storedUser
        .map(x => Jwt.encode(Json.toJson(UserResource(x.get.login, x.get.password, x.get.eMail))
          .toString, secretKey, JwtAlgorithm.HS256))

      val cookie = jwt.map(x => Cookie("auth-token", x))

      val jsonQuestionnairePost = Json.parse(
        """{
          |"text": "This is a test questionnaire",
          |"pictureIds": [3]
          |}
        """.stripMargin)
      val request = cookie.map(x => FakeRequest(POST, "/")
        .withJsonBody(jsonQuestionnairePost)
        .withCookies(x))

      val resp = request.map(req => controller
        .addQuestionnaire()
        .apply(req))

      val response = Await.result(resp, 5.seconds)

      status(response) mustBe CREATED
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("\"This is a test questionnaire\"")
      println(contentAsString(response))


    }
  }

  "ComparisonController GET" should {

    "return the resource" in {
      val controller = inject[QuestionnaireController]
      val response = controller.getQuestionnaire(1).apply(FakeRequest(GET, "/"))

      status(response) mustBe OK
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("\"pictures\"")
      //      println(contentAsString(response))

    }
  }

  "ComparisonController GET all" should {

    "return the resources" in {
      val controller = inject[QuestionnaireController]
      val response = controller.getQuestionnaireAll().apply(FakeRequest(GET, "/"))

      status(response) mustBe OK
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("\"pictures\"")
      //      println(contentAsString(response))

    }
  }
}
