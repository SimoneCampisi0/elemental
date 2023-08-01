#FROM openjdk:17
#COPY ./target/elemental-service-1.0-SNAPSHOT.jar elemental-service-1.0-SNAPSHOT.jar
#CMD ["java","-jar","elemental-service-1.0-SNAPSHOT.jar"]
#Salvo le immagini nella folder /app/assets
FROM openjdk:17

COPY ./src/main/java/com/simonecampis/Elemental/assets ./src/main/resources/static/assets

COPY ./target/elemental-service-1.0-SNAPSHOT.jar /app/elemental-service-1.0-SNAPSHOT.jar

CMD ["java","-jar","/app/elemental-service-1.0-SNAPSHOT.jar"]