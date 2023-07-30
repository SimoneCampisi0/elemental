SET DOCKER_REPOSITORY=discovery
SET DOCKER_GOAL=dockerBuild
mvn clean package -U
docker-compose up