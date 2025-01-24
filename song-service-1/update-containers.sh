#!/bin/bash

# Function to clear MongoDB database
clear_mongo_collection() {
  local mongo_container_name=$1

  # Execute the mongosh command to delete documents from the collection 
  docker exec $mongo_container_name mongosh --eval "db.getSiblingDB('song-service').songs.deleteMany({})"
  docker exec $mongo_container_name mongosh --eval "db.getSiblingDB('song-service').logentries.deleteMany({})"
}

# Clear MongoDB database for song-service-1
clear_mongo_collection "backend1-mongo-1" 

# Clear MongoDB database for song-service-2
clear_mongo_collection "backend2-mongo-1" 

# Clear MongoDB database for song-service-3
clear_mongo_collection "backend3-mongo-1"  

# Build the Docker image
echo "Building the Docker image..."
docker-compose build 

# Function to update and recreate a Docker Compose setup
update_and_recreate() {
  local compose_file=$1
  local project_name=$2

  echo "Updating and recreating containers for project: $project_name"

  # Recreate the containers
  docker-compose -f $compose_file -p $project_name up --force-recreate -d

  echo "Containers for project $project_name have been updated and recreated."
}



# Update and recreate containers for backend1
update_and_recreate "docker-compose.yml" "backend1"

# Update and recreate containers for backend2
update_and_recreate "docker-compose.service2.yml" "backend2"

# Update and recreate containers for backend3
update_and_recreate "docker-compose.service3.yml" "backend3"



echo "All containers have been updated and recreated."