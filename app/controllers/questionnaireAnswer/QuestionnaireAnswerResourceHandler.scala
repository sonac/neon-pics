package controllers.questionnaireAnswer

import com.google.inject.Inject
import models._
import models.daos.QuestionnaireAnswerRepository
import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.collection.immutable
import scala.concurrent.{ExecutionContext, Future}

case class QuestionnaireAnswerResource(questionnaireId: Int, scores: Seq[PictureIdScore])

object QuestionnaireAnswerResource {

  implicit val implicitFormat: Format[QuestionnaireAnswerResource] = (
    (__ \ "questionnaireId").format[Int] and
      (__ \ "pictureIdScores").format[Seq[PictureIdScore]]
  )(QuestionnaireAnswerResource.apply, unlift(QuestionnaireAnswerResource.unapply))

}

case class QuestionnaireSimplifiedResource(id: Int, text: String)

object QuestionnaireSimplifiedResource {
  implicit val implicitFormat: Format[QuestionnaireSimplifiedResource] = (
    (__ \ "id").format[Int] and
      (__ \ "text").format[String]
  )(QuestionnaireSimplifiedResource.apply, unlift(QuestionnaireSimplifiedResource.unapply))
}

case class QuestionnaireAnswerPictureResource(questionnaireId: Int, scores: Seq[PictureScore])

object QuestionnaireAnswerPictureResource {

  implicit val implicitFormat: Format[QuestionnaireAnswerPictureResource] = (
    (__ \ "questionnaireId").format[Int] and
      (__ \ "pictureScores").format[Seq[PictureScore]]
    )(QuestionnaireAnswerPictureResource.apply, unlift(QuestionnaireAnswerPictureResource.unapply))

}

class QuestionnaireAnswerResourceHandler @Inject()(questionnaireAnswerRepository: QuestionnaireAnswerRepository)(implicit ec: ExecutionContext) {

  def create(questionnaireAnswer: QuestionnaireAnswerResource, userName: String): Future[Option[Unit]] = {
    questionnaireAnswerRepository.addQuestionnaireAnswer(questionnaireAnswer.questionnaireId,
      userName,
      questionnaireAnswer.scores)
  }

  def getAll: Future[Seq[QuestionnaireAnswerResource]] = {
    questionnaireAnswerRepository.getAllAnswers.map(x =>
      x.map( t =>
        QuestionnaireAnswerResource(t.questId, t.pictureIdScores)
      )
    )
  }

  def getQAnswer(questId: Int): Future[Option[QuestionnaireAnswerPictureResource]] = {
    questionnaireAnswerRepository.getQuestionnaireAnswer(questId)
      .map(sr => sr match {
        case Some(x) =>
          val groupedScores: Seq[PictureScore] = x.pictureScores
            .map(x => ((x.id, x.picUrl), x.score))
            .groupBy(_._1)
            .mapValues(_.map(_._2).sum)
            .map(gv => PictureScore(gv._1._1, gv._1._2, gv._2)).toSeq
          Some(QuestionnaireAnswerPictureResource(x.questId, groupedScores))
        case None => None
      })
  }

  def getAnsweredQuestions: Future[Seq[QuestionnaireSimplifiedResource]] = {
    questionnaireAnswerRepository.getAllAnsweredQuests.map(fq => fq.map(x => QuestionnaireSimplifiedResource(x.id, x.text)))
  }

}