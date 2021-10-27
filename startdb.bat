docker run -d -p 5306:3306 -e MARIADB_ROOT_PASSWORD=2021aminum% -e MARIADB_DATABASE=chess -e MARIADB_USER=appchess -e MARIADB_PASSWORD=Chess,aminum2021 --net chess-network --name chessdb mariadb

docker run -d -p 8080:80 -e PMA_HOST=chessdb -e PMA_PASSWORD=2021aminum% --net chess-network --name phpmyadm phpmyadmin

docker run -d -p 9042:8042 -e WELCOME=Guillaume -e NODEHOST=localhost NODEPORT=8042 -e DB_HOST=chessdb -e DB_PORT=3306 -e DB_USER=appchess -e DB_PASSWORD=Chess,aminum2021 -e DB_DATABASE=chess --net chess-network --name appchess appchess

