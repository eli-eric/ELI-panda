#!/bin/sh

docker-compose -f docker-compose-databases-local.yml down

backup_timestamp=$(date +"%Y-%m-%d-%H-%M-%S")
backup_name=${backup_timestamp}"-neo4j.dump"

docker run --interactive --tty --rm \
--volume=$HOME/panda-dev/neo4j-security/data:/data \
--volume=$HOME/panda-dev/neo4j-security/backups:/backups \
neo4j/neo4j-admin:4.4.15 neo4j-admin dump --database=neo4j --to=/backups/${backup_name}