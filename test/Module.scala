import javax.inject._

import com.google.inject.AbstractModule
import net.codingwell.scalaguice.ScalaModule
import play.api.{Configuration, Environment}
import services.comparison.{QuestionnaireRepository, QuestionnaireRepositoryImpl}
import services.{PostgresService, PostgresServiceProduction}
import slick.jdbc.PostgresProfile

class Module (environment: Environment, configuration: Configuration)
  extends AbstractModule
    with ScalaModule {
  override def configure(): Unit = {

    //    bind(classOf[PostgresService]).to(classOf[PostgresServiceProduction])
    bind[PostgresService].to[PostgresServiceProduction]
    bind[QuestionnaireRepository].to[QuestionnaireRepositoryImpl].in[Singleton]
    //    bind(classOf[PostgresService]).to(classOf[PostgresServiceProduction])
    // Use the system clock as the default implementation of Clock
    //    bind(classOf[Clock]).toInstance(Clock.systemDefaultZone)
    // Ask Guice to create an instance of ApplicationTimer when the
    // application starts.
    //    bind(classOf[ApplicationTimer]).asEagerSingleton()
    //    bind(classOf[Counter]).to(classOf[AtomicCounter])
  }
}
