- install nodejs.
  https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04
- install npm
- install n,pm2,yarn.
- install mysql.
  root access
  https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04

	ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'arbitrage';
	FLUSH PRIVILEGES;
	CREATE DATABASE arbitrage;

	sudo mysql_secure_installation

- install port mapping if needed.
- set config db.
- pm2 start.