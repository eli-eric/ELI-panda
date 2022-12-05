#!/bin/sh

echo "Try to stop neo4j container: panda-security-neo4j ..."
docker stop panda-security-neo4j
echo "Stopped."
echo ""

echo "Backup neo4j database..."
# # backup_timestamp=$(date +"%Y-%m-%d-%H-%M-%S")
# # backup_name=${backup_timestamp}"-neo4j.dump"

docker run --interactive --tty --rm \
--volume=$HOME/panda-dev/neo4j-security/data:/data \
--volume=$HOME/panda-dev/neo4j-security/backups:/backups \
neo4j/neo4j-admin:5.2.0 neo4j-admin database dump neo4j --to-path="/backups" --overwrite-destination
echo "Backup done."

echo ""
echo "Try to start neo4j container: panda-security-neo4j ..."
docker start panda-security-neo4j
echo "Starting... It could take a while. You check the status running: docker logs panda-security-neo4j"
echo ""
