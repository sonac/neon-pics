package services

import com.google.inject.Singleton
import slick.jdbc.PostgresProfile.api._
import slick.jdbc.{H2Profile, PostgresProfile, SQLActionBuilder}

import scala.concurrent.Await
import scala.concurrent.duration._

trait DbService {
  def db: Database
}

@Singleton
class DbServicePostgresProduction extends DbService {
  val db: PostgresProfile.backend.Database = PostgresProfile.api.Database.forConfig("productionDb")
}

@Singleton
class DbServiceH2 extends DbService {
  val db = init()

  def init(): Database = {
    val db = H2Profile.api.Database.forURL("jdbc:h2:mem:test1;DATABASE_TO_UPPER=false;DB_CLOSE_DELAY=-1", driver = "org.h2.Driver")

    val sql: SQLActionBuilder =
      sql"""
           |DROP TABLE IF EXISTS pictures ;
           |CREATE TABLE pictures (
           |  id      SERIAL PRIMARY KEY,
           |  pic_url VARCHAR(256)
           |);
           |
 |DROP TABLE IF EXISTS tags ;
           |CREATE TABLE tags (
           |  id  SERIAL PRIMARY KEY,
           |  tag VARCHAR(256)
           |);
           |
 |DROP TABLE IF EXISTS picture_tags ;
           |CREATE TABLE picture_tags (
           |  pic_id INT,
           |  tag_id INT
           |);
           |
 |DROP TABLE IF EXISTS questionnaire ;
           |CREATE TABLE questionnaire (
           |  id   SERIAL PRIMARY KEY,
           |  text VARCHAR(2000)
           |);
           |
 |
 |DROP TABLE IF EXISTS questionnaire_picture ;
           |CREATE TABLE questionnaire_picture (
           |  quest_id INT,
           |  pic_id   INT,
           |  PRIMARY KEY (quest_id, pic_id)
           |);
           |
 |DROP TABLE IF EXISTS questionnaire_score;
           |CREATE TABLE questionnaire_score (
           |  quest_id INT,
           |  user_id  INT,
           |  pic_id   INT,
           |  score    FLOAT,
           |  PRIMARY KEY (quest_id, user_id, pic_id)
           |);
           |
 |INSERT INTO pictures (id, pic_url)
           |VALUES (1, 'https://i.pinimg.com/564x/c6/57/75/c65775b98acd6be835065f604af66435.jpg');
           |INSERT INTO pictures (id, pic_url)
           |VALUES (2, 'https://i.pinimg.com/564x/20/01/83/200183f453efd290c1afcdca626db0c0.jpg');
           |INSERT INTO pictures (id, pic_url)
           |VALUES (3, 'http://www.lovethispic.com/uploaded_images/22349-Neon-Lights-Coca-cola.jpg');
           |INSERT INTO pictures (id, pic_url)
           |VALUES (4, 'https://i.pinimg.com/564x/56/6e/51/566e514696c5a967625bf4c8e416d4fb.jpg');
           |
 |INSERT INTO questionnaire
           |VALUES (1, 'Which neon text looks better?');
           |
 |INSERT INTO questionnaire_picture
           |VALUES (1, 1), (1, 2), (1, 3), (1, 4);
      """.stripMargin

    val f = db.run(sql.asUpdate)
    val x = Await.result(f, 5.second)

    db
  }

}
