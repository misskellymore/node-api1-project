// implement your API here

// instead of import use require
const express = require('express');

const server = express();

const port = 8000;
server.listen(port, () => console.log('api running'));

const users = require('./data/db.js');



server.use(express.json());

// Post


server.post('/users', (req, res) => {
    const userInfo = req.body;

    if(userInfo.hasOwnProperty('name') && userInfo.hasOwnProperty('bio')) {

        Users.insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })

        .catch(err => {
            res.status(500).json({err: 'Please provide name and bio for the user.'})
        })
    } else {

        res.status(400).json({errorMessage: 'There was an error while saving the user to the database'});
    }   

    
})




// Get

server.get('/users', (req, res) => {
    users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
})




// GET User ID


server.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    Users.findById(userId)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'The user with the specified ID does not exist.'});
        }
    })

    .catch( err => {
        res.status(500).json({err: 'The user information could not be retrieved.'});
    })
})


// Delete

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;


    User.remove(userId)
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

server.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const changes = req.body;


    Users.update(userId, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({errorMessage: 'The user with the specified ID does not exist.'});
        }
    })
    .catch(err => {
        res.status(500).json({err: 'The user information could not be modified.'})
    })
})






