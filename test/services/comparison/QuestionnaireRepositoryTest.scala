package services.comparison

import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting

import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

class QuestionnaireRepositoryTest extends PlaySpec with GuiceOneAppPerTest with Injecting {
  "addQuestionnaire" should {
    "create questionnaires correctly" in {
      val questionnaireRepository = inject[QuestionnaireRepository]
      import questionnaireRepository._

      val f = for {
        _ <- addQuestionnaire(text = "Which neon is the best?", List(3, 4))
        qs <- getAllQuestionnaires
      } yield qs

      val qs = Await.result(f, 5.seconds)
      println(qs)
    }
  }
}