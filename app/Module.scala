import javax.inject._

import com.google.inject.AbstractModule
import net.codingwell.scalaguice.ScalaModule
import play.api.{Configuration, Environment}
import services.comparison.{QuestionnaireAnswerRepository, QuestionnaireRepository, QuestionnaireRepositoryImpl}
import services.user._
import services.{DbService, DbServicePostgresProduction}

class Module(environment: Environment, configuration: Configuration)
  extends AbstractModule
    with ScalaModule {
  override def configure(): Unit = {
    bind[DbService].to[DbServicePostgresProduction]
    bind[QuestionnaireRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
    bind[QuestionnaireAnswerRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
  }
}
