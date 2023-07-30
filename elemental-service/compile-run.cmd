SET DOCKER_REPOSITORY=elementalService
SET DOCKER_GOAL=dockerBuild
mvn clean package -U
docker-compose up