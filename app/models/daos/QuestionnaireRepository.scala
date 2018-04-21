package models.daos

import com.google.inject.{Inject, Singleton}
import models._
import play.api.db.slick.DatabaseConfigProvider
import play.db.NamedDatabase

import scala.collection.immutable
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Success, Failure}

trait QuestionnaireRepository {
  def addQuestionnaire(text: String, pictureIds: Seq[Int] = List()): Future[Int]

  def getQuestionnaireById(questId: Int): Future[Option[QuestionnaireWithPictures]]

  def getQuestionnaireAll: Future[Seq[QuestionnaireWithPictures]]
}

trait QuestionnaireAnswerRepository {
  def addQuestionnaireAnswer(questId: Int, userName: String, pictureIdScores: Seq[PictureIdScore]): Future[Option[Unit]]

  def getQuestionnaireAnswer(questId: Int, userId: Int): Future[Option[QuestionnaireScores]]

  def getAllAnswers: Future[Seq[QuestionnaireScoreWithUser]]
}

@Singleton
class QuestionnaireRepositoryImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider,
                                            userRepository: UserRepository)(implicit ec: ExecutionContext)
  extends QuestionnaireRepository
    with QuestionnaireAnswerRepository
    with DAOSlick {

  import profile.api._

  def addQuestionnaire(text: String, pictureIds: Seq[Int] = List()): Future[Int] = {
    for {
      q <- db.run(insertQuestionnaireTable += Questionnaire(0, text))
      qps = pictureIds.map { pid => QuestionnairePicture(q.id, pid) }
      _ <- db.run(questionnairePictureTable ++= qps)
    } yield q.id
  }

  def getQuestionnaireById(questId: Int): Future[Option[QuestionnaireWithPictures]] = {
    val q = questionnaireTable
      .filter(_.id === questId)
      .joinLeft(questionnairePictures)
      .on(_.id === _._1.questId)

    for {
      x <- db.run(q.result)
      ans: immutable.Iterable[QuestionnaireWithPictures] = x.groupBy {
        _._1
      }.map { case (q1, s) =>
        val pics: Seq[Picture] = s.collect { case (_, Some(y)) => y._2 }
        QuestionnaireWithPictures(q1, pics)
      }
    } yield ans.headOption
  }

  def getQuestionnaireAll: Future[Seq[QuestionnaireWithPictures]] = {
    val q =
      questionnaireTable
        .joinLeft(questionnairePictures)
        .on(_.id === _._1.questId)

    for {
      x <- db.run(q.result)
      ans: immutable.Iterable[QuestionnaireWithPictures] = x.groupBy {
        _._1
      }.map { case (q1, s) =>
        val pics: Seq[Picture] = s.collect { case (_, Some(y)) => y._2 }
        QuestionnaireWithPictures(q1, pics)
      }
    } yield ans.toSeq
  }

  def addQuestionnaireAnswer(questId: Int, userName: String, pictureIdScores: Seq[PictureIdScore]): Future[Option[Unit]] = {
    /*for {
     usr <- userRepository.getUserByLogin(userName)
     pId <- pictureIdScores
     _ <- db.run(questionnaireScoreTable += QuestionnaireScore(questId, usr.get.id, pId.id, pId.score))
    } yield questId*/
    val usr = userRepository.getUserByLogin(userName)
    usr.foreach(println(_))
    usr.map(ou => ou.map( uid => {
      pictureIdScores.map(pId =>
        db.run(questionnaireScoreTable += QuestionnaireScore(questId, uid.id, pId.id, pId.score)))
    }))
  }

  def getQuestionnaireAnswer(questId: Int, userId: Int): Future[Option[QuestionnaireScores]] = {
    val questWithPics: Future[Option[QuestionnaireWithPictures]] = getQuestionnaireById(questId)
    val qPicIdScores = questionnaireScoreTable
      .filter(_.questId === questId)
      .filter(_.userId === userId)
      .map(x => (x.picId, x.score))
    val pictureIdScores: Future[Seq[PictureIdScore]] = db.run(qPicIdScores.result).map(_.map(x => PictureIdScore(x._1, x._2)))

    for {
      oqwp <- questWithPics
      pis <- pictureIdScores
    } yield {
      oqwp.map(QuestionnaireScores(_, userId, pis))
    }

  }

  def getAllAnswers: Future[Seq[QuestionnaireScoreWithUser]] = {
    val q = questionnaireScoreTable
      .join(userTable)
      .on(_.userId === _.id)

    val t: Future[Seq[(QuestionnaireScore, User)]] = db.run(q.result)
    for {
      x <- t
      ans = x.groupBy {
      _._1
    }.map { case (q1, s) =>
        val z = (q1.questId, q1.userId)
      val picScores: Seq[PictureIdScore] = s.collect { case (q, _) => PictureIdScore(q.picId, q.score)}
      QuestionnaireScoreWithUser(q1.questId, s.head._2.login, picScores)
    }
    } yield ans.toSeq

  }

}
