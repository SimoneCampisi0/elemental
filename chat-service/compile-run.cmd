SET DOCKER_REPOSITORY=chat
SET DOCKER_GOAL=dockerBuild
mvn clean package -U
docker-compose up