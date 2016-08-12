
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

4) Make migration
```
path/to/project/$ php artisan migrate
```

5) Fill database by data
```
path/to/project/$ php artisan db:seed
```

6) Run local php server
```
path/to/project/$ php artisan serve
```

7) You can find project on
```
http://localhost:8000/
```