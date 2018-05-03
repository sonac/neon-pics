package controllers.user

import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting

import scala.concurrent.Await
import scala.concurrent.duration._

class UserResourceHandlerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "UserResourceHandler.get" should {
    "return user" in {
      val userResourceHandler = inject[UserResourceHandler]
      import userResourceHandler._

      val u = get("testUser")

      val qs = Await.result(u, 5.seconds)
      println(qs)
    }
  }

  "UserResourceHandler " should {
    "properly create anonymous user" in {
      val userResourceHandler = inject[UserResourceHandler]
      import userResourceHandler._

      val u = createAnonymousUser()
      val qs = Await.result(u, 5.seconds)

      qs must include("Anonym")
    }
  }

}