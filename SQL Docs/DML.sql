-- Group 60: OneStop Anime
-- Data Manipulation Queries
-- Carlos Jauregui and Skylar Posler

-- Users Table

--read
SELECT * FROM Users;

--create
INSERT INTO Users (first_name, last_name, street_address, city, state, postal_code, email, username) 
VALUES
(
    :first_nameInput, :last_nameInput, :cityInput, :street_addressInput, :stateInput, :postal_code, :emailInput, :usernameInput
);

--update
UPDATE Users SET first_name = :first_nameInput, last_name = :last_nameInput, street_address = :street_addressInput, city = :cityInput, state = :stateInput, postal_code = :postal_codeInput, email = :emailInput, username = :usernameInput
WHERE user_id = :user_idFromUpdateForm;

--delete
DELETE FROM Users WHERE user_id = :user_idFromUserPage;



-- Titles Table

--read
SELECT *, DATE_Format(release_date, "%m/%d/%Y") as releaseDate FROM Titles;

--create
INSERT INTO Titles(title, studio, genre, release_date, completed)
VALUES 
( 
    :titleInput, :studioInput, :genreInput, :release_dateInput, :completedFromDropdown
);

--update
UPDATE Titles SET title = :titleInput, studio = :studioInput, genre = :genreInput, release_date = :release_dateInput, completed = :completedInput 
WHERE title_id = :title_idFromDropdown; 

--delete
DELETE FROM Titles WHERE title_id = :title_idFromTitlePage; 



-- Streaming Platforms Table

--read
SELECT * FROM StreamingPlatforms;

--create
INSERT INTO StreamingPlatforms(platform_name, platform_price)
VALUES 
(:platform_nameInput, :platform_priceInput);

--update

UPDATE StreamingPlatforms SET platform_name = :platform_nameInput, platform_price = :platform_priceInput WHERE platform_id = :platform_idInput;

--delete
DELETE FROM StreamingPlatforms WHERE platform_id = :platform_idFromStreamingPlatformsPage;


-- Title Host Table - Intersection

--read
SELECT title_host_id, Titles.title_id, Titles.title, StreamingPlatforms.platform_id, StreamingPlatforms.platform_name FROM TitleHost
    INNER JOIN Titles ON TitleHost.title_id = Titles.title_id
    LEFT JOIN StreamingPlatforms ON TitleHost.platform_id = StreamingPlatforms.platform_id
    ORDER BY (title_host_id) ASC;

--create
INSERT INTO TitleHost (platform_id, title_id)
VALUES 
( 
    (
        Select platform_id FROM StreamingPlatforms
        WHERE platform_name = :platform_nameFromDropdown
    ),
    (
        Select title_id FROM Titles
        WHERE title = :title_nameFromDropdown
    )
);

--update

UPDATE TitleHost SET platform_id = (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = :platform_nameFromDropdown) WHERE title_host_id = :title_host_idFromTitleHostPage;

--delete
DELETE FROM TitleHost WHERE title_host_id = :title_host_idFromTitleHostPage; 


-- Subscriptions Table- Intersection

--read

SELECT subscription_id, Users.user_id, Users.username, StreamingPlatforms.platform_id, StreamingPlatforms.platform_name, DATE_Format(sub_start, "%m/%d/%Y") as sub_start
    FROM Subscriptions
    INNER JOIN Users ON Subscriptions.user_id = Users.user_id
    INNER JOIN StreamingPlatforms ON Subscriptions.platform_id = StreamingPlatforms.platform_id
    ORDER BY (subscription_id) ASC;

--create
INSERT INTO Subscriptions (user_id, platform_id, sub_start)
VALUES 
( 
    (
        Select user_id FROM Users
        WHERE email = :emailFromDropdown
    ),
    (
        Select platform_id FROM StreamingPlatforms
        WHERE platform_name = :platform_nameFromDropdown
    ),
    :sub_start
);


--delete
DELETE FROM Subscriptions WHERE subscription_id = :subscription_idFromSubscriptionPage;
