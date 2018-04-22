package controllers.picture

import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting

import scala.concurrent.{Await, Future}
import scala.concurrent.duration._

class PictureResourceHandlerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "PictureResourceHandlerTest" should {
    "return ids of created pictures" in {
      val pictureResourceHandler = inject[PictureResourceHandler]
      import pictureResourceHandler._

      val pics: PictureSequenceResource = PictureSequenceResource(Seq(PictureResource("http://www.pic1.com"),
        PictureResource("http://www.pic2.com")))
      val ca: Future[Seq[Int]] = create(pics)
      val fw = Await.result(ca, 5.seconds)

      //TODO: Make test independent from initial DB setup
      fw must contain(5)
    }
  }

}

/*
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
 */