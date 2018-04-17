FROM openjdk:8-jre
COPY build /build
EXPOSE 9000 9443
CMD /build/bin/start -Dhttps.port=9443 -Dplay.crypto.secret=secret