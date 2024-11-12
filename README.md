# NginX config file

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include mime.types;
    client_max_body_size 10M;
    
    upstream songService {
        server 127.0.0.1:5002;
        server 127.0.0.1:5003;
        server 127.0.0.1:5004;
    }

    server {
        listen 4000;

        location / {
            proxy_pass http://songService/create;
        }
    }
}
