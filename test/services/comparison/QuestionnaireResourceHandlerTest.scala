package services.comparison

import controllers.questionnaire.QuestionnaireResourceHandler
import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting

import scala.concurrent.Await
import scala.concurrent.duration._

class QuestionnaireResourceHandlerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "ComparisonResourceHandler.get" should {
    "return questionnaire" in {
      val comparisonResourceHandler = inject[QuestionnaireResourceHandler]
      import comparisonResourceHandler._

      val f = get(1)

      val qs = Await.result(f, 5.seconds)
      println(qs)
    }
  }

}
