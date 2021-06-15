<template>
  <div class="wiki">
    <h2>Проксирование через Nginx</h2>
    <p>
            Для проксирования можно воспользоваться следующим конфигом nginx
          </p>
          <p>
            Подходит если у вас нет SSL сертификата или его предоставляет вам
            CloudFlare
          </p>
          <pcode code='
server {
        listen 80;
        server_name projectname.ru;
        location / {
                root /путь/до/updates;
        }
        location /api {
                proxy_pass http://localhost:9274/api;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
        location /webapi {
                proxy_pass http://localhost:9274/webapi;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
'/>
          <p>
            Подходит если у вас есть SSL сертификат(в том числе от Let's
            Encrypt)
          </p>
          <pcode code='
    server {
        listen 80;
        listen 443 ssl;
        server_name projectname.ru;
        ssl_certificate /путь/до/сертификата.crt;
        ssl_certificate_key /путь_до/ключа/сертификата.key;
        location / {
                root /путь/до/updates;
        }
        location /api {
                proxy_pass http://localhost:9274/api;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
        location /webapi {
                proxy_pass http://localhost:9274/webapi;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Real-IP $remote_addr;
        }
}
'/>
  </div>
</template>
<script>
import coremethods from '@/components/core-methods.js'
export default {
  mixins: [coremethods],
  created: function () {}
}
</script>
