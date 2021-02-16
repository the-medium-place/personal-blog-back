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
    db.Post.findAll({
        include:[db.Comment, db.Tag]
    }).then(dbPosts => {
        res.json(dbPosts);
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
})

// get post by id
router.get('/:id', (req, res) => {
    db.Post.findOne({
        where: {id: req.params.id},
        include: [db.Comment, db.Tag]
    })
    .then(dbPost => {
        res.status(200).json(dbPost)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
})

// get posts by tag id
router.get('/tag/:id', (req,res)=>{
    const tagSearchId = req.params.id

    db.Post.findAll({
        include:{
            model:db.Tag,
            where: {
                id: tagSearchId
            }
        }   
    })
    .then(dbPosts => {
        res.json(dbPosts)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).send(err)
    })
})

// save new post
router.post('/', ({ body },res) => {
    // TODO: After front end is done, make sure 'tags' is coming through as an Array!!!!!
    // =========================================!!!!!!!!=================================
    // expected body shape: {title, text, image1url, image2url, image3url, tags(Array)}
    console.log(body);
    const tags = body.tags.split(',')
    console.log('HERES THE TAGS: ', '\n====================\n', tags)
    body.UserId = 1; // should always be UserId for me - the only user!
    db.Post.create(body)
    .then(dbNewPost => {
        if(tags && tags.length > 0){
            tags.forEach(tag => {
                dbNewPost.addTag(tag);
            })
        }
        res.status(200).send(dbNewPost)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})





module.exports = router