`mkdir nginx-filebeat`

`mkdir nginx-filebeat/data`

`mkdir nginx-filebeat/config`

`mkdir nginx-filebeat/logs`

`sudo chown -R 1000:1000 $HOME/nginx-filebeat`

`sudo setfacl --recursive --modify user:1000:rwX,default:user:1000:rwX /var/log/nginx/`

`sudo setfacl --recursive --modify user:svachaj:rwX,default:user:svachaj:rwX /home/svachaj/nginx-filebeat`
