const express = require('express');
const router = express.Router();
const db = require('../models');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const checkAuthStatus = request => {
    // console.log("headers: ",request.headers);
    if (!request.headers.authorization) {
        return false
    }
    const token = request.headers.authorization.split(" ")[1]
    // console.log(token);
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            // console.log("err: ", err)
            return false
        }
        else {
            // console.log("data: ", data)
            return data
        }
    });
    // console.log("loggedInUser: ",loggedInUser)
    return loggedInUser
}

// get all posts
router.get("/", (req, res) => {
    db.Image.findAll().then(dbImages => {
        res.json(dbImages);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

// save new post
router.post('/:id', ({ body, params },res) => {
    body.PostId = params.id
    console.log(body);
    db.Image.create(body)
    .then(dbNewImage => {
        res.status(200).send(dbNewImage)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})



module.exports = router