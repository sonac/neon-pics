package controllers.questionnaireAnswer

import akka.http.scaladsl.model.Uri.Empty
import controllers.user.UserResource
import models.daos.UserRepository
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import pdi.jwt.{Jwt, JwtAlgorithm}
import play.api.Configuration
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test._
import play.api.libs.json._
import play.api.mvc.Cookie

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Add your spec here.
  * You can mock out a whole application including requests, plugins etc.
  *
  * For more information, see https://www.playframework.com/documentation/latest/ScalaTestingWithScalaTest
  */
class QuestionnaireAnswerControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ComparisonAnswerController POST" should {

    "create and return the resource" in {
      val controller = inject[QuestionnaireAnswerController]

      val jsonQuestionnairePost = Json.parse(
        """{
          |"questionnaireId": 1,
          |"pictureIdScores": [{"pictureId": 3, "score": 2}, {"pictureId": 2, "score": 1}]
          |}
        """.stripMargin)
      val request = FakeRequest(PUT, "/").withJsonBody(jsonQuestionnairePost)

      val response = controller
        .addQuestionnaireAnswer()
        .apply(request)


      status(response) mustBe CREATED
//      contentType(response) mustBe Some("application/json")
//      contentAsString(response) mustBe """"""
      println(contentAsString(response))

      val getReq = FakeRequest(GET, "/comparison-answer/all")

      val getResp = controller
        .getAllQuestionnaireAnswers
        .apply(getReq)

      contentAsString(getResp) must include("\"score\":2")

    }
  }

  "Questionnaire Controller" should {
    "create and returned grouped results" in {
      val controller = inject[QuestionnaireAnswerController]
      val usRepo = inject[UserRepository]
      val conf = inject[Configuration]

      val jsonQuestionnairePost1 = Json.parse(
        """{
          |"questionnaireId": 1,
          |"pictureIdScores": [{"pictureId": 3, "score": 2}, {"pictureId": 2, "score": 1}]
          |}
        """.stripMargin)
      val req1 = FakeRequest(PUT, "/").withJsonBody(jsonQuestionnairePost1)

      val jsonQuestionnairePost2 = Json.parse(
        """{
          |"questionnaireId": 1,
          |"pictureIdScores": [{"pictureId": 3, "score": 1}, {"pictureId": 2, "score": 2}]
          |}
        """.stripMargin)
      val req2 = FakeRequest(PUT, "/").withJsonBody(jsonQuestionnairePost2)

      lazy val resp1 = controller
        .addQuestionnaireAnswer()
        .apply(req1)

      lazy val resp2 = controller
        .addQuestionnaireAnswer()
        .apply(req2)


      val secretKey = conf.get[String]("play.http.secret.key")
      val storedUser = usRepo.getUserByLogin("testUser")
      val jwt = storedUser
        .map(x => Jwt.encode(Json.toJson(UserResource(x.get.login, x.get.password, x.get.eMail))
          .toString, secretKey, JwtAlgorithm.HS256))
      val cookie = jwt.map(x => Cookie("auth-token", x))
      val getReq = cookie.map(x => FakeRequest(GET, "/comparison-answer/1")
        .withCookies(x))

      lazy val getResp = getReq.map(x => controller
        .getQuestAnswer(1)
        .apply(x))


      val response = for {
        x1 <- resp1
        x2 <- resp2
        x3 <- getResp
      } yield x3

      val resp = Await.result(response, 5.seconds)

      contentAsString(resp) must include("\"score\":3")

    }
  }

  "Questionnaire Controller getQuestionAnswer" should {
    "return list of questions with answers" in {
      val controller = inject[QuestionnaireAnswerController]

      val getReq = FakeRequest(GET, "/comparison-questions")

      val getResp = controller
        .getAnsweredQuestions
        .apply(getReq)

      contentAsString(getResp) must include("\"text\":\"Which")

    }
  }

}
