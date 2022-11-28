#!/bin/bash

port=5001



# Start the first process
PORT=${port} yarn start &
  
# Start the second process
# yarn cypress run --record --key $CYPRESS_RECORD_KEY --browser chrome --tag "chrome" --env host=http://localhost:5001
# yarn cypress run --record --key $CYPRESS_RECORD_KEY --browser edge --tag "edge" --env host=http://localhost:5001
# yarn cypress run --record --key $CYPRESS_RECORD_KEY --browser firefox --tag "firefox" --env host=http://localhost:5001 &

yarn cypress run --browser chrome --tag "chrome" --env host=http://localhost:${port}
yarn cypress run --browser edge --tag "edge" --env host=http://localhost:${port}
yarn cypress run --browser firefox --tag "firefox" --env host=http://localhost:${port} &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?
