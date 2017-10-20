# Douban R'bao

> Vue.js + node.js + web 爬虫 + less + lodash + Niginx跨域代理
project

## Build Setup

``` bash
# install web dependencies
npm install
# install server dependencies
cd server
npm install
# web serve with hot reload at localhost:8081
npm run dev
# server at localhost:3001
npm run server
# build for production with minification
npm run build
# nginx config listen to 82 port;
listen       82;
server_name  localhost;
location / {
    proxy_connect_timeout 1; 
    proxy_send_timeout 30; 
    proxy_read_timeout 60;
    proxy_pass http://localhost:8081/;
}
location ^~/cross/{
    
    rewrite ^/cross/(.*)$ /$1 break;
    proxy_pass http://localhost:3001/;
}
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
