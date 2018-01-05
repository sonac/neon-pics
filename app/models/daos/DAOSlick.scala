package models.daos

import slick.jdbc.JdbcProfile
import play.api.db.slick.HasDatabaseConfigProvider

/**
  * Trait that contains generic slick db handling code to be mixed in with DAOs
  */

trait DAOSlick extends HasDatabaseConfigProvider[JdbcProfile] with DBTableDefinitions