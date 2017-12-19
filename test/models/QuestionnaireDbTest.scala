package models

import org.scalatest.{FlatSpec, Matchers}

import scala.concurrent.Await
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

class QuestionnaireDbTest extends FlatSpec with Matchers {

  "Questionnaire" should "create questionnaires correctly" in {

    val f = for {
      _ <- QuestionnaireDb.addQuestionnaire(text = "Which neon is the best?", List(3, 4))
      qs <- QuestionnaireDb.getAllQuestionnaires
    } yield qs

    val qs = Await.result(f, 5.seconds)
    println(qs)
    qs.length shouldEqual 1
  }


}
