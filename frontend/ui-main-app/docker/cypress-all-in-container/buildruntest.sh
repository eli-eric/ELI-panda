#!/bin/bash

# Start the first process
yarn start &
  
# Start the second process
yarn cypress run --browser chrome --env host=http://localhost:5001
yarn cypress run --browser edge --env host=http://localhost:5001
yarn cypress run --browser firefox --env host=http://localhost:5001 &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?
