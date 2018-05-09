FROM hseeberger/scala-sbt:8u151-2.12.4-1.0.2
COPY target/ target/
COPY conf/ conf/
EXPOSE 9000 5432
CMD target/universal/stage/bin/neon-pics -Dplay.http.secret.key=kek -Dconfig.file=conf/application.prod.conf
#CMD /bin/bash
