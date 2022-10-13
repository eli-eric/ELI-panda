## We are using minio database for as a file storage

=== minio setup guide

`sudo mkdir -p $HOME/minio/data`

`sudo mkdir -p $HOME/minio/certs`

`sudo openssl req -x509 -nodes -days 3650 -newkey rsa:4096 -addext "subjectAltName=DNS:panda.eli-beams.eu" -subj /CN=panda.eli-beams.eu -keyout private.key -out public.crt`

put certs into $HOME/minio/certs

`sudo chown -R 1002:1002 $HOME/minio`
