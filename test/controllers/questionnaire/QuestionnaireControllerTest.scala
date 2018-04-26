package controllers.questionnaire

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test._

class QuestionnaireControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ComparisonController POST" should {

    "create and return the resource" in {
      val controller = inject[QuestionnaireController]

      val jsonQuestionnairePost = Json.parse(
        """{
          |"text": "This is a test questionnaire",
          |"pictureIds": [3]
          |}
        """.stripMargin)
      val request = FakeRequest(POST, "/").withJsonBody(jsonQuestionnairePost)

      val response = controller
        .addQuestionnaire()
        .apply(request)


      status(response) mustBe CREATED
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("\"text\":\"This is a test questionnaire\"")
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
