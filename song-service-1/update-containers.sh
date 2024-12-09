#!/bin/bash

# Build the Docker image
echo "Building the Docker image..."
docker-compose build 

# Function to update and recreate a Docker Compose setup
update_and_recreate() {
  local compose_file=$1
  local project_name=$2

  echo "Updating and recreating containers for project: $project_name"

  # Recreate the containers
  docker-compose -f $compose_file -p $project_name create --force-recreate

  echo "Containers for project $project_name have been updated and recreated."
}

# Update and recreate containers for backend1
update_and_recreate "docker-compose.yml" "backend1"

# Update and recreate containers for backend2
update_and_recreate "docker-compose.service2.yml" "backend2"

# Update and recreate containers for backend3
update_and_recreate "docker-compose.service3.yml" "backend3"

echo "All containers have been updated and recreated."