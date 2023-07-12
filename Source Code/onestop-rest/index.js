/*Citation for CRUD Functionality - index.js
5/23/2023 - 6/10/2023
OneStopAnime - Made with REACT
Get/Post/Put/Delete/Update functions based on starer code provided here:https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js , cors functionality was help given by TA's, queries are our own work.*/


/*CRUD Functionality for all entities*/
const express = require('express');
const app = express();          
const db = require('./db-connector');
const cors = require('cors');
app.use(express.json());
app.use(
  cors({ credentials: true, origin: "http://flip3.engr.oregonstate.edu:12487" })
);


/* USERS*/

/*READ*/
app.get("/Users", (req, res) => {
    const sqlSELECT = "SELECT * FROM Users;"
    db.pool.query(sqlSELECT, function(err, rows) {
        let users = rows;
        if (err) {
            console.log(err);
            res.send("Error occurred");
        } else {
            res.send(users);
        }
    })
});

/*CREATE*/
app.post("/users-create", (req, res) => {

    const { firstName, lastName, streetAddress, city, state, postalCode, email, username } = req.body;
    const sqlINSERT = `INSERT INTO Users (first_name, last_name, street_address, city, state, postal_code, email, username) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    const values = [firstName, lastName, streetAddress, city, state, postalCode, email, username];
    db.pool.query(sqlINSERT, values, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(201)
        }
    })

});

/*UPDATE*/
app.put('/users/update/:id', (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, street_address, city, state, postal_code, email, username } = req.body;
    // Construct the SQL query
    const query = 'UPDATE Users SET first_name = ?, last_name = ?, street_address = ?, city = ?, state = ?, postal_code = ?, email = ?, username = ? WHERE user_id = ?';
    const values = [first_name, last_name, street_address, city, state, postal_code, email, username, userId];
  
    // Execute the query
    db.pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
      } else {
        res.sendStatus(200);
      }
    });
  });

  /*DELETE*/
  app.delete('/users/delete/:id', (req, res) => {
    const userId = req.params.id;
  
    // Construct the SQL query with embedded userId
    const query = `DELETE FROM Users WHERE user_id = ${userId}`;
  
    // Execute the query
    db.pool.query(query, (error, results) => {
      if (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
      } else {
        res.sendStatus(200);
      }
    });
  });


/* TITLES */

/*READ*/
app.get("/Titles", (req, res) => {
    const sqlSELECT = `SELECT *, DATE_Format(release_date, "%m/%d/%Y") AS releaseDate FROM Titles;`
    db.pool.query(sqlSELECT, function(err, rows) {
    let titles = rows;
    if (err) {
        console.log(err);
        res.send("Error occurred");
    } else {
        res.send(titles);
    }
    })
});

/*CREATE*/
app.post("/titles-create", (req, res) => {

    const { title, studio, genre, releaseDate, completed} = req.body;
    const sqlINSERT = `INSERT INTO Titles (title, studio, genre, release_date, completed) VALUES (?, ?, ?, ?, ?);`;

    const values = [title, studio, genre, releaseDate, completed];
    db.pool.query(sqlINSERT, values, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.status(201).send('Successfully added title to library.');
        }
    })

});

/*UPDATE*/
app.put('/titles/update/:id', (req, res) => {
    const titleId = req.params.id;
    const { title, studio, genre, releaseDate, completed} = req.body;
    // Construct the SQL query
    const query = 'UPDATE Titles SET title = ?, studio = ?, genre = ?, release_date = ?, completed = ? WHERE title_id = ?';
    const values = [title, studio, genre, releaseDate, completed, titleId ];
  
    // Execute the query
    db.pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating title:', error);
        res.status(500).json({ error: 'Failed to update title.' });
      } else {
        res.sendStatus(200);
      }
    });
  });

  /*DELETE*/
  app.delete('/titles/delete/:id', (req, res) => {
    const titleId = req.params.id;
  
    // Construct the SQL query with embedded titleId
    const query = `DELETE FROM Titles WHERE title_id = ${titleId}`;
  
    // Execute the query
    db.pool.query(query, (error, results) => {
      if (error) {
        console.error('Error deleting title:', error);
        res.status(500).json({ error: 'Failed to delete title.' });
      } else {
        res.sendStatus(200);
      }
    });
  });


  /*STREAMING PLATFORMS*/
  
  /*READ*/
  app.get("/StreamingPlatforms", (req, res) => {
    const sqlSELECT = "SELECT * FROM StreamingPlatforms;"
    db.pool.query(sqlSELECT, function(err, rows) {
        let streamingPlatforms = rows;
        if (err) {
            console.log(err);
            res.send("Error occurred");
        } else {
            res.send(streamingPlatforms);
        }
    })
});

/*CREATE*/
app.post("/streamingplatform-create", (req, res) => {

    const { platformName, platformPrice } = req.body;
    const sqlINSERT = `INSERT INTO StreamingPlatforms (platform_name, platform_price) VALUES (?, ?);`;

    const values = [platformName, platformPrice];
    db.pool.query(sqlINSERT, values, function(error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(201)
        }
    })

});

/*UPDATE*/
app.put('/streamingplatforms/update/:id', (req, res) => {
    console.log('Update Marker')
    const platformId = req.params.id;
    const { platformName, platformPrice } = req.body;
    // Construct the SQL query
    const query = `UPDATE StreamingPlatforms SET platform_name = ?, platform_price = ?  WHERE platform_id = ?`;
    const values = [platformName, platformPrice, platformId];
  
    // Execute the query
    db.pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating streaming platform:', error);
        res.status(500).json({ error: 'Failed to update streaming platform.' });
      } else {
        res.sendStatus(200);
      }
    });
  });

  /*DELETE*/
  app.delete('/streamingplatforms/delete/:id', (req, res) => {
    const platformID = req.params.id;
  
    // Construct the SQL query with embedded userId
    const query = `DELETE FROM StreamingPlatforms WHERE platform_id = ${platformID}`;
  
    // Execute the query
    db.pool.query(query, (error, results) => {
      if (error) {
        console.error('Error deleting streaming platform:', error);
        res.status(500).json({ error: 'Failed to delete streaming platform.' });
      } else {
        res.sendStatus(200);
      }
    });
  });

  /*TITLE HOSTS*/

/*READ*/
  app.get("/TitleHosts", (req, res) => {
    const sqlSELECT = `SELECT title_host_id, Titles.title_id, Titles.title, StreamingPlatforms.platform_id, StreamingPlatforms.platform_name
                       FROM TitleHost
                       INNER JOIN Titles ON TitleHost.title_id = Titles.title_id
                       LEFT JOIN StreamingPlatforms ON TitleHost.platform_id = StreamingPlatforms.platform_id
                       ORDER BY (title_host_id) ASC;`
    db.pool.query(sqlSELECT, function(err, rows) {
    let titlehosts = rows;
    if (err) {
        console.log(err);
        res.send("Error occurred");
    } else {
        res.send(titlehosts);
    }
    })
});

/*CREATE*/
app.post("/titlehosts-create", (req, res) => {
  
  const { platformName, title } = req.body;

  const sqlINSERT = `INSERT INTO TitleHost (platform_id, title_id)
                     VALUES 
                     ( 
                        (
                            Select platform_id FROM StreamingPlatforms
                            WHERE platform_name = ?
                        ),
                        (
                            Select title_id FROM Titles
                            WHERE title = ?
                        )
                    );`
    const values = [platformName, title];
    db.pool.query(sqlINSERT, values, function(error) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(201)
        }
    })

});

/*UPDATE*/
app.put('/titlehost/update/:id', (req, res) => {
  const title_host_id = req.params.id;
  const { platform_name} = req.body;


  // Construct the SQL query
  const query = `UPDATE TitleHost SET platform_id = (SELECT platform_id FROM StreamingPlatforms WHERE platform_name = ?) WHERE title_host_id = ?`;
  const values = [platform_name,  title_host_id];


  // Execute the query
  db.pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating title host:', error);
      res.status(500).json({ error: 'Failed to update title host.' });
    } else {
      res.sendStatus(200);
    }
  });
});

/*DELETE*/
app.delete('/titlehosts/delete/:id', (req, res) => {
  const titleHostID = req.params.id;

  // Construct the SQL query with embedded userId
  const query = `DELETE FROM TitleHost WHERE title_host_id = ${titleHostID}`;

  // Execute the query
  db.pool.query(query, (error, results) => {
    if (error) {
      console.error('Error deleting title host:', error);
      res.status(500).json({ error: 'Failed to delete title host.' });
    } else {
      res.sendStatus(200);
    }
  });
});


/*SUBSCRIPTIONS*/

/*READ*/
app.get("/Subscriptions", (req, res) => {
  const sqlSELECT = `SELECT subscription_id, Users.user_id, Users.username, StreamingPlatforms.platform_id, StreamingPlatforms.platform_name,
   DATE_FORMAT(sub_start, "%m/%d/%Y") as sub_start
                     FROM Subscriptions
                     INNER JOIN Users ON Subscriptions.user_id = Users.user_id
                     INNER JOIN StreamingPlatforms ON Subscriptions.platform_id = StreamingPlatforms.platform_id
                     ORDER BY (subscription_id) ASC;`
  db.pool.query(sqlSELECT, function(err, rows) {
  let subscriptions = rows;
  if (err) {
      console.log(err);
      res.send("Error occurred");
  } else {
      res.send(subscriptions);
  }
  })
});

/*CREATE*/
app.post("/subscription-create", (req, res) => {
  
  const { userID, platformID, sub_start_date } = req.body;
  
  const sqlINSERT = `INSERT INTO Subscriptions (user_id, platform_id, sub_start)
  VALUES 
  (?, ?, ?);`
    const values = [userID, platformID, sub_start_date];
    console.log(values)
    db.pool.query(sqlINSERT, values, function(error) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.send(201)
        }
    })

});

/*DELETE*/
app.delete('/subscriptions/delete/:id', (req, res) => {
  const subscriptionID = req.params.id;

  // Construct the SQL query with embedded subscriptionId
  const query = `DELETE FROM Subscriptions WHERE subscription_id = ${subscriptionID}`;

  // Execute the query
  db.pool.query(query, (error, results) => {
    if (error) {
      console.error('Error deleting subscription:', error);
      res.status(500).json({ error: 'Failed to delete subscription.' });
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(12488, () => {
    console.log('Running Backend Server, press Ctrl+C to terminate.');
});