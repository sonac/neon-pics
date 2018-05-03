package controllers.questionnaire

import play.api.data.Form

case class QuestionnaireFormInput(text: String, pictureIds: Seq[Int] = Seq())

object QuestionnaireFormInput {
  val form: Form[QuestionnaireFormInput] = {
    import play.api.data.Forms._

    Form(
      mapping(
        "text" -> text,
        "pictureIds" -> seq(number)
      )(QuestionnaireFormInput.apply)(QuestionnaireFormInput.unapply)
    )
  }
}
