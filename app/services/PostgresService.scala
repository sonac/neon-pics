package services

import com.google.inject.Singleton
import slick.jdbc.PostgresProfile
import slick.jdbc.PostgresProfile.api._

trait PostgresService {
  def db: PostgresProfile.backend.Database
}

@Singleton
class PostgresServiceProduction extends PostgresService {
  val db: PostgresProfile.backend.Database = Database.forConfig("productionDb")
}

@Singleton
class PostgresServiceTest extends PostgresService {
  val db: PostgresProfile.backend.Database = Database.forConfig("neonDb")
}
