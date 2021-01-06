DROP DATABASE IF EXISTS sequelize_introduction;

CREATE DATABASE sequelize_introduction;

USE sequelize_introduction;

CREATE TABLE `article`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR (100) NOT NULL,
    `content` VARCHAR (500) NOT NULL,
    `author` VARCHAR (100) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);