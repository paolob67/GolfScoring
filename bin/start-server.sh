#!/bin/bash
if [ -z "$CI" ]; then
  BASE_DIR=`dirname "$0"`
  $BASE_DIR/stop-server.sh

  SERVER_CONTAINER_NAME="golf_scoring_server"
  docker run --name $SERVER_CONTAINER_NAME -p 3000:3000 -d golf-scoring
fi
