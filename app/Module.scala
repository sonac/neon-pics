import javax.inject._

import com.google.inject.AbstractModule
import net.codingwell.scalaguice.ScalaModule
import play.api.{Configuration, Environment}
import services.comparison.{QuestionnaireAnswerRepository, QuestionnaireRepository, QuestionnaireRepositoryImpl}
import services.{PostgresService, PostgresServiceProduction}

class Module(environment: Environment, configuration: Configuration)
  extends AbstractModule
    with ScalaModule {
  override def configure(): Unit = {
    bind[PostgresService].to[PostgresServiceProduction]
    bind[QuestionnaireRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
    bind[QuestionnaireAnswerRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
  }
}
