package controllers.user

import models.User
import models.daos.UserRepository
import org.scalatestplus.play.PlaySpec
import org.scalatestplus.play.guice.GuiceOneAppPerTest
import play.api.test.Injecting

import scala.concurrent.{Await, Future}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

class UserRepositoryTest extends PlaySpec with GuiceOneAppPerTest with Injecting {
  "getUser" should {
    "retrieve some user" in {
      val userRepository = inject[UserRepository]
      import userRepository._

      val fUsr = getUserByLogin("testUser")
      val usr = Await.result(fUsr, 5.seconds)

      assert(usr.isInstanceOf[Option[User]])

      print(usr)
    }
  }

  "addUser" should {
    "create correctly user in db" in {
      val userRepository = inject[UserRepository]
      import userRepository._

      val f = for {
        _ <- addUser(id = 2, login = "mockUser", password = "mockPassword", eMail = "mockEMail")
        usr <- getUserByLogin("mockUser")
      } yield usr

      val usr = Await.result(f, 5.seconds)
      assert(usr.get === User(id = 2, login = "mockUser", password = "mockPassword", eMail = "mockEMail"))

      print(usr.get)
    }
  }

}
