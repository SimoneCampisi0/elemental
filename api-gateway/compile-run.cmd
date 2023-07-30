SET DOCKER_REPOSITORY=gateway
SET DOCKER_GOAL=dockerBuild
mvn clean package -U
docker-compose up