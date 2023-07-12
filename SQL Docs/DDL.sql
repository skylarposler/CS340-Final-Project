SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/* Creates the Customers Table */
CREATE OR REPLACE TABLE Users(
    user_id         int             AUTO_INCREMENT NOT NULL UNIQUE,
    first_name      varchar(45)     NOT NULL,
    last_name       varchar(45)     NOT NULL,
    street_address  varchar(250)    NOT NULL,
    city            varchar(45),
    state           varchar(45),
    postal_code     varchar(10),
    email           varchar(45)     NOT NULL,
    username        varchar(50)     NOT NULL UNIQUE,
    PRIMARY KEY (user_id)
);

/* Creates the Streaming Platforms Table */
CREATE OR REPLACE TABLE StreamingPlatforms (
    platform_id     int             AUTO_INCREMENT NOT NULL UNIQUE,
    platform_name   varchar(45)     NOT NULL,
    platform_price  float,
    PRIMARY KEY(platform_id)
);

/* Creates the Subscriptions Table */
CREATE OR REPLACE TABLE Subscriptions (
    subscription_id int             AUTO_INCREMENT NOT NULL,  
    user_id         int             NOT NULL,
    platform_id     int             NOT NULL,
    sub_start       date,
    PRIMARY KEY (subscription_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    CONSTRAINT unique_platformid_customerid UNIQUE (platform_id, user_id),
    FOREIGN KEY (platform_id) REFERENCES StreamingPlatforms(platform_id) ON DELETE CASCADE
);

/* Creates the TitleHost Table */
CREATE OR REPLACE TABLE TitleHost (
    title_host_id   int             AUTO_INCREMENT NOT NULL,
    platform_id     int,             
    title_id        int             NOT NULL,
    PRIMARY KEY (title_host_id),
    FOREIGN KEY (platform_id) REFERENCES StreamingPlatforms(platform_id),
    CONSTRAINT unique_platformid_title_id UNIQUE (platform_id, title_id),
    FOREIGN KEY (title_id) REFERENCES Titles(title_id) ON DELETE CASCADE
);

/* Creates the Titles Table */
CREATE OR REPLACE TABLE Titles(
    title_id        int             AUTO_INCREMENT NOT NULL UNIQUE,
    title           varchar(250)    NOT NULL,
    studio          varchar(45)     NOT NULL,
    genre           varchar(45),
    release_date    date,
    completed       boolean         NOT NULL,
    PRIMARY KEY(title_id)
);

/* Inserts Info into the Customers Table */
INSERT INTO Users (first_name, last_name, street_address, city, state, postal_code, email, username)
VALUES
('Naruto', 'Uzumaki', '356 NE Portobello Road', 'Beverly Hills', 'California', '90210', 'ramenlover88@gmail.com', '9tailfox'),
('Lelouch', 'Lamperouge', '1745 SE Lions Mane Street', 'Los Angeles', 'California', '90507', 'LelouchViBritannia@gmail.com', 'pizzalover'),
('Satoru', 'Gojo', '8734 SW Shiitake Way', 'Ramona', 'California', '92065', 'gojo_infinity@gmail.com', 'redbluepurple');

/* Inserts info into the StreamingPlatforms Table */
INSERT INTO StreamingPlatforms (platform_name, platform_price)
VALUES
('Netflix', 15.99),
('CrunchyRoll', 9.99),
('HBO Max', 9.99),
('Funimation', 9.99),
('HiDive', 4.99);

/* Inserts info into the Subscriptions Table*/
INSERT INTO Subscriptions (user_id, platform_id, sub_start)
VALUES
(
    (SELECT user_id FROM Users WHERE first_name = 'Lelouch' and last_name = 'Lamperouge'),
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_id = 1),
    '2018-09-22'
),
(
    (SELECT user_id FROM Users WHERE email = 'gojo_infinity@gmail.com'),
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'CrunchyRoll'),
    '2022-12-15'
),
(
    (SELECT user_id FROM Users WHERE user_id = 1),
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'HiDive'),
    '2023-01-27'
);

/* Inserts info into the Titles Table */
INSERT INTO Titles (title, studio, genre, release_date, completed)
VALUES
('Yona of the Dawn', 'Pierrot', 'Adventure/Epic Fantasy/Romance', '2014-10-07', TRUE),
('Tokyo Ghoul', 'Pierrot', 'Drama/Horror/Supernatural', '2014-06-04', TRUE),
('Jujutsu Kaisen', 'Mappa', 'Adventure/Dark Fantasy/Supernatural', '2020-10-23', FALSE),
('Hunter x Hunter', 'Nippon TV', 'Adventure Fiction/Fantasy/Martial Arts', '2011-10-02', FALSE),
('Code Geass', 'Sunrise', 'Alternate History/Mecha/Military', '2007-11-30', TRUE),
('Death Parade', 'Madhouse', 'Psychological Thriller', '2013-03-02', TRUE);

/* Inserts info into the TitleHost Table */
INSERT INTO TitleHost (platform_id, title_id)
VALUES
(
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'HiDive'),
    (SELECT title_id FROM Titles WHERE title = 'Jujutsu Kaisen')
),
(
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'CrunchyRoll'),
    (SELECT title_id FROM Titles WHERE title = 'Hunter x Hunter')
),
(
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'Netflix'),
    (SELECT title_id FROM Titles WHERE title = 'Code Geass')
),
(
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'Funimation'),
    (SELECT title_id FROM Titles WHERE title = 'Death Parade')
),
(
    (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = 'Funimation'),
    (SELECT title_id FROM Titles WHERE title = 'Code Geass')
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;










