package controllers.questionnaireAnswer

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test._

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
          |"userId": 1,
          |"pictureIdScores": [{"pictureId": 3, "score": 2}, {"pictureId": 2, "score": 1}]
          |}
        """.stripMargin)
      val request = FakeRequest(POST, "/").withJsonBody(jsonQuestionnairePost)

      val response = controller
        .addQuestionnaireAnswer()
        .apply(request)


      status(response) mustBe CREATED
//      contentType(response) mustBe Some("application/json")
//      contentAsString(response) mustBe """"""
      println(contentAsString(response))

    }
  }

}
