DROP DATABASE IF EXISTS vsnarrativenest_db;
CREATE DATABASE vsnarrativenest_db;

CREATE TABLE user (
     user_id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     username VARCHAR(50) NOT NULL,
     password  NVARCHAR(50) NOT NULL
);

CREATE TABLE blog (
     blog_id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     user_id INTEGER NOT NULL,
     blog_title VARCHAR(100) NOT NULL,
     blog_post NVARCHAR(2000) NOT NULL,
     FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE blog_comments (
     comment_id INTEGER NOT NULL AUTO_INCREMENT Primary Key,
     blog_id INTEGER NOT NULL,
     user_id INTEGER NOT NULL,
     comment_post NVARCHAR(1000) NOT NULL,
     FOREIGN KEY (blog_id) REFERENCES blog(blog_id), 
     FOREIGN KEY (user_id) REFERENCES user(user_id)
);