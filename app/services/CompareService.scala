package services

import scala.concurrent.Future

import scala.concurrent.ExecutionContext.Implicits.global

object CompareService {

  def compareTwo: Future[(String, String)] = {

    for {
      pics: Seq[String] <- PictureService.getAllPictures
      firstTwo = pics.take(2)
    } yield (firstTwo(0), firstTwo(1))

  }

}
