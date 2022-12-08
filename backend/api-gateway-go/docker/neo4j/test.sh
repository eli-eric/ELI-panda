#!/bin/sh

# We will be looking for the backups here: $HOME/panda-dev/neo4j-security/backups
# We will try to get the latest backup automatically if no arg of the file path to the dump file is presented

BACKUP_DIR="${HOME}/panda-dev/neo4j-security/backups"

get_recent_file () {
    FILE=$(ls -Art1 ${BACKUP_DIR} | tail -n 1)
    if [ ! -f ${FILE} ]; then
        BACKUP_DIR="${BACKUP_DIR}/${FILE}"
        get_recent_file
    fi
    echo $(basename $FILE)
}

get_recent_file