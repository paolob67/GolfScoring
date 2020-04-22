#!/bin/bash
if [ -z "$CI" ]; then
  BASE_DIR=`dirname "$0"`
  $BASE_DIR/remove-network.sh

  DB_CONTAINER_NAME="golf_scoring_db"
  SERVER_CONTAINER_NAME="golf_scoring_server"
  GOLF_NETWORK_NAME="golf_scoring_network"

  docker network create -d bridge --subnet 172.25.0.0/16 $GOLF_NETWORK_NAME
  docker network connect $GOLF_NETWORK_NAME $DB_CONTAINER_NAME
  docker network connect $GOLF_NETWORK_NAME $SERVER_CONTAINER_NAME

  echo "> Check value of mongo datasource config to have host:" $DB_CONTAINER_NAME

fi
