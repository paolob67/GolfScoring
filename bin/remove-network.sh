#!/bin/bash
DB_CONTAINER_NAME="golf_scoring_db"
SERVER_CONTAINER_NAME="golf_scoring_server"
GOLF_NETWORK_NAME="golf_scoring_network"

docker network disconnect $GOLF_NETWORK_NAME $SERVER_CONTAINER_NAME
docker network disconnect $GOLF_NETWORK_NAME $DB_CONTAINER_NAME
docker network rm $GOLF_NETWORK_NAME
