#!/bin/sh

# We will be looking for the backups here: $HOME/panda-dev/neo4j-security/backups
# We will try to get the latest backup automatically if no arg of the file path to the dump file is presented

# # BACKUP_DIR="${HOME}/panda-dev/neo4j-security/backups"

# # get_recent_file () {
# #     FILE=$(ls -Art1 ${BACKUP_DIR} | tail -n 1)
# #     if [ ! -f ${FILE} ]; then
# #         BACKUP_DIR="${BACKUP_DIR}/${FILE}"
# #         get_recent_file
# #     fi
# #     echo $(basename $FILE)  
# # }

# # BACKUP_FILE=""

# # if [ "$1" ] 
# # then
# #     echo "Using file from the argument."
# #     BACKUP_FILE=$1
# # else
# #     echo "Using latest backup from the backups directory."
# #     BACKUP_FILE=$(get_recent_file)
# # fi


echo "Try to stop neo4j container: panda-security-neo4j ..."
docker stop panda-security-neo4j
echo "Stopped."
echo ""

echo "Restore neo4j database..."

docker run --interactive --tty --rm \
--volume=$HOME/panda-dev/neo4j-security/data:/data \
--volume=$HOME/panda-dev/neo4j-security/backups:/backups \
neo4j/neo4j-admin:5.2.0 neo4j-admin database load neo4j --from-path="/backups" --overwrite-destination
echo "Restore done."

echo ""
echo "Try to start neo4j container: panda-security-neo4j ..."
docker start panda-security-neo4j
echo "Starting... It could take a while. You check the status running: docker logs panda-security-neo4j"
echo ""

