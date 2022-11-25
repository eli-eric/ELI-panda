#!/bin/bash

# Start the first process
yarn start &
  
# Start the second process
yarn cypress run --record --key $CYPRESS_RECORD_KEY --browser chrome --tag "chrome" --env host=http://localhost:5001
yarn cypress run --record --key $CYPRESS_RECORD_KEY --browser edge --tag "edge" --env host=http://localhost:5001
yarn cypress run --record --key $CYPRESS_RECORD_KEY --browser firefox --tag "firefox" --env host=http://localhost:5001 &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?
