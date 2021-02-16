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
    db.Comment.findAll().then(dbPosts => {
        res.json(dbPosts);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

// save new comment
router.post('/:id', ({ body, params }, res) => {
    body.PostId = params.id
    console.log(body);
    db.Comment.create(body)
        .then(dbNewUser => {
            res.status(200).send(dbNewUser)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
})

// update approval of comment true/false
router.put('/setapproval/:id', ({ body, params }, res) => {
    // expected body object: { approved: $BOOLEAN_VALUE$ }
    db.Comment.update({
        approved: body.approved
    }, {
        where: {
            id: params.id
        }
    })
    .then(dbComment => {
        res.status(200).json(dbComment);
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err);
    })

})



module.exports = router