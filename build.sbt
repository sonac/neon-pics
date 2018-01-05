import com.typesafe.sbt.packager.MappingsHelper.{directory, _}
import sbt.Keys.mappings

name := """neon-pics"""
organization := "sonac"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.3"

mappings in Universal ++= directory(baseDirectory.value / "public")

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test,
  "com.typesafe.play" %% "play-slick" % "3.0.0",
  "org.postgresql" % "postgresql" % "9.4-1206-jdbc41",
  "com.h2database" % "h2" % "1.4.196" % Test,
  "net.codingwell" %% "scala-guice" % "4.1.1")

dockerRepository := Some("eu.gcr.io")

packageName in Docker := "neon-pics/production"

dockerUpdateLatest := true

javaOptions in Test += "-Dconfig.file=conf/application.test.conf"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "sonac.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "sonac.binders._"
