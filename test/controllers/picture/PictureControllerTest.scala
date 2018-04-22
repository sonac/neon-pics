package controllers.picture

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test._

class PictureControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "PictureController POST" should {
    "create pictures and return their ids" in {
      val controller = inject[PictureController]

      val jsonPicturesPost = Json.parse(
        """{
          |"pics": [
          |{ "url" : "http://www.pic3.com" },
          |{ "url" : "http://www.pic4.com" }
          |]
          |}
        """.stripMargin
      )

      val request = FakeRequest(POST, "/").withJsonBody(jsonPicturesPost)

      val response = controller
        .addPictures()
        .apply(request)

      status(response) mustBe CREATED
      contentType(response) mustBe Some("application/json")
      contentAsString(response) must include("[5,6]")
      println(contentAsString(response))

    }
  }

}