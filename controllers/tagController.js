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

// get all tags
router.get("/", (req, res) => {
    db.Tag.findAll().then(dbTags => {
        res.json(dbTags);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

// get tag by id
router.get('/:id',(req,res)=> {
    db.Tag.findOne({where:{id:req.params.id}})
    .then(dbTag => {
        res.json(dbTag)
    })
    .catch(err => {
        console.log(err);
        res.status(500).end(); 
    })
})


// save new tag
router.post('/', ({ body },res) => {
    console.log(body);
    db.Tag.create(body)
    .then(dbNewTag => {
        res.status(200).send(dbNewTag)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

// update tag
router.put('/:id', (req,res) => {
    const { body, params } = req;
    console.log(body,params)

    db.Tag.update({text: body.text},{where:{id:params.id}})
    .then(dbUpdatedTag => {
        res.status(200).send(dbUpdatedTag)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})



module.exports = router