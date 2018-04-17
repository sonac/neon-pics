import javax.inject._

import com.google.inject.AbstractModule
import models.daos.{QuestionnaireAnswerRepository, QuestionnaireRepository, QuestionnaireRepositoryImpl}
import net.codingwell.scalaguice.ScalaModule
import play.api.{Configuration, Environment}

class Module(environment: Environment, configuration: Configuration)
  extends AbstractModule
    with ScalaModule {
  override def configure(): Unit = {
    bind[QuestionnaireRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
    bind[QuestionnaireAnswerRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
  }
}
