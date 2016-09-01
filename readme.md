# BSA forum 2016

## How to install

### Backend part

#### Before run:

1) You need composer.
If you do not have yet, please refer to https://getcomposer.org/

2) You need MySql database server.
If you do not have yet, please refer to https://www.mysql.com/

3) Create database "database_name"

#### Run

1) Clone or download this repository

2) Install project dependencies
```
path/to/project/$ sudo composer install
```

3) Check file .env in the root directory and put database settings
```
DB_CONNECTION = mysql
DB_HOST = your host
DB_PORT=3306
DB_DATABASE = "database_name"
DB_USERNAME = "user_name"
DB_PASSWORD = "password"
```

4) Make migration and fill database by data
```
path/to/project/$ php artisan migrate; path/to/project/$ php artisan db:seed
```

5) Run local php server
```
path/to/project/$ php artisan serve --host=127.0.0.1
```
(--host=127.0.0.1 need for socket server)

6) You can find project on
```
http://localhost:8000/
```

### Frontend part (SPA)

0) create your own config.js in path/to/project/resources/assets/js/app/config/debug|prod. Use config.js.example as example.
(Usually you will only need to configure socketUrl and debug mode)

1) install all javascript packages
```
npm install
```

2) install Ruby (for sass dependency)

*Ubuntu*
```
sudo apt-get install ruby-full
```

*Windows*
Go to http://rubyinstaller.org/downloads/ and download stable version

3) install sass package from rubygems.org

*Ubuntu*
```
sudo gem install sass
```

*Windows*
```
gem install sass
```

4) compile all resources
```
grunt dev
```

### Socket server part

1) install all javascript packages
```
npm install
```

2) install Redis

*Ubuntu*
Go to https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis

*Windows*
Go to https://github.com/rgl/redis/downloads and download stable version

3) run redis server

*Ubuntu*
will start automatic

*Windows*
go to instalation folder and run redis-server.exe

4) Check file .env in the root directory and put redis settings
```
BROADCAST_DRIVER=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

5) start socket server (enter in root directory)
```
node socket/server.js
```
