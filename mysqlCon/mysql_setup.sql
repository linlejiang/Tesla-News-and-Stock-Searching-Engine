create table tesla_news ( id INT NOT NULL, ticker VARCHAR(255) NOT NULL,Headline VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, content TEXT(65535) NOT NULL, Date DATE NOT NULL, Publisher VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, article_id INT NOT NULL, Topic VARCHAR(255) NOT NULL,  PRIMARY KEY(article_id) );

LOAD DATA LOCAL INFILE "path_to_csv_file" INTO TABLE tesla_news FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS; 

alter table tesla_news modify Date text;