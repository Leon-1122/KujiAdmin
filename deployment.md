# 项目部署说明

1. ###安装系统工具
        yum -y install wget
        yum -y install vim
        yum -y install gcc
        yum -y install git

2. ###安装nvm
        wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

3. ###安装nodejs
        nvm install 10.20.0
        nvm alias default 10.20.0

4. ###安装mongodb
    - 添加yum源

          touch /etc/yum.repos.d/mongodb-org-4.2.repo

    - 添加以下内容

            [mongodb-org-4.2]
            name=MongoDB Repository
            baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
            gpgcheck=1
            enabled=1
            gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc

    - 使用yum安装mongodb

            yum install -y mongodb-org

    - 修改服务脚本 用户改成root

            vim /etc/rc.d/init.d

    - 修改文件夹权限

            chown -R root:root /var/lib/mongo
            chown -R root:root /var/log/mongodb

    - 设置用户

            mongo
            use admin
            db.createUser({ user:"root", pwd:"123456", roles:["root"] })
            use kuji
            db.createUser({ user:"kuji", pwd:"asdfadf", roles:["readWrite", "dbAdmin"] })

    - 修改密码

            db.changeUserPassword('kuji','asdfasdf')

    - 修改配置文件设置需要用户名和密码登录

            vim /etc/mongod.conf

        添加以下内容

            #security:
            security:
              authorization: enabled

    - 启动/停止服务

            service mongod start
            service mongod stop
            service mongod restart

    - 数据库连接

            mongo mongodb://kuji:asdfasdf@localhost:27017/kuji

5. ###部署代码
    - git拉取代码

            mkdir -p /var/local/www
            git clone -b non-cloud https://github.com/Leon-1122/KujiAdmin.git

    - 修改配置文件

            /var/local/www/KujiAdmin/config/env/production.js

            #数据库配置
            datastores

            #域名设置
            onlyAllowOrigins

            #微信支付以及售货机API设置
            custom

    - 启动

            cd /var/local/www/KujiAdmin
            npm install sails -g
            npm install
            sails lift --prod

    - 后台启动app

            cd /var/local/www/KujiAdmin
            npm install -g pm2
            pm2 start app.js -x -- --prod     开启守护进程
            pm2 restart all                   重启所有进程
            pm2 restart 0                     重启指定进程
            pm2 stop all                      停止

6. ###开放远程端口访问

    - 查看已开放端口

            iptables -L -n --line-number

    - 添加端口

            #web应用端口
            iptables -I INPUT 5 -p tcp --dport 1337 -j ACCEPT
            iptables -I INPUT 6 -p tcp --dport 80 -j ACCEPT
            iptables -I INPUT 7 -p tcp --dport 443 -j ACCEPT

            #数据库端口
            iptables -I INPUT 8 -p tcp --dport 27017 -j ACCEPT

            #保存
            service iptables save

7. ###安装nginx
        yum -y install epel-release
        yum update
        yum -y install nginx

    修改配置文件

        /etc/nginx/conf.d/default.conf

        server {
          listen       80;
          server_name  localhost;

          location / {
            proxy_pass http://localhost:1337;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
          }
        }

    重启nginx

        #检查配置文件是否正确
        nginx -t

        #重启
        nginx -s reload
