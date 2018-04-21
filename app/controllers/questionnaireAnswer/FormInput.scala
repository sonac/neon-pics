package controllers.questionnaireAnswer

import play.api.data.{Form, Mapping}

case class PictureIdScoreFormInput(pictureId: Int, score: BigDecimal)

object PictureIdScoreFormInput {
  val mapping: Mapping[PictureIdScoreFormInput] = {
    import play.api.data.Forms.{number, bigDecimal}
    play.api.data.Forms.mapping(
      "pictureId" -> number,
      "score" -> bigDecimal
    )(PictureIdScoreFormInput.apply)(PictureIdScoreFormInput.unapply)
  }
}

case class QuestionnaireAnswerFormInput(questionnaireId: Int, userName: String, pictureIdScores: Seq[PictureIdScoreFormInput])

object QuestionnaireAnswerFormInput {
  val form: Form[QuestionnaireAnswerFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "questionnaireId" -> number,
        "userName" -> text,
        "pictureIdScores" -> seq(PictureIdScoreFormInput.mapping)
      )
      (QuestionnaireAnswerFormInput.apply)(QuestionnaireAnswerFormInput.unapply)
    )
  }
}