// implement your API here

// instead of import use require
const express = require('express');
const db = require('./data/db.js');

const server = express();

const port = 8000;
server.listen(port, () => console.log('api running'));

const users = require('./data/db.js');



server.use(express.json());
// middleware

// Post


server.post('/api/users', (req, res) => {
    console.log(req.body)
    const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({err: 'need name and bio'});
    }  else {
        db.insert({ name, bio })
          .then(({ id }) => {
            db.findById(id)
              .then(user => {
                res.status(201).json(user);
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({error: "server error retrieving user"});
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: "server error inserting user"});
          });
        }
    });
    
        




// Get

server.get('/api/users', (req, res) => {
    console.log(db.find());
    db.find()
    .then(users => 
        res.status(200).json(users)
        // 200 means good
    )
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
})




// GET User ID


server.get('/api/users/:id', (req, res) => {
    const { userId } = req.params.id;

    db.findById(userId)
    .then(user => 
        
        {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'The user with the specified ID does not exist.'});
        }
    }
    // 404 means not found
    )

    .catch( err => {
        res.status(500).json({err: 'The user information could not be retrieved.'});
    })
})


// Delete

server.delete('/api/users/:id', (req, res) => {
    
    db.remove(req.params.id)
    
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'The user with the specified ID does not exist.'});

        }
    })

    .catch(err => {
        res.status(500).json({err: 'The user could not be removed'});
    })
})


// Put w/user ID

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, bio} = req.body;

    if (!name && !bio) {
        res.status(400).json({err: 'need changes'});
    }
    db.update(id, {name, bio})
    .then(updated => {
        if (updated) {
            db.findById(id)
            .then( user => res.status(200).json(user))
            .catch(err => {
                res.status(500).json({err: 'error getting user'});
            });
        } else {
            res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'});
        }

    })    
    .catch(err => {
        res.status(500).json({err: 'The user information could not be modified.'})
    })
})






