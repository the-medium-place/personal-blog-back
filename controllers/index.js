const express = require('express');
const router = express.Router();

const loginRoutes = require('./userController');
const postRoutes = require('./postController');
const commentRoutes = require('./commentController');
const tagRoutes = require('./tagController');

const nodemailer = require('nodemailer');

router.get('/', (req,res) => {
    res.send('Welcome to zac\'s blog api-side!');
})

router.get('/contactme', (req,res) => {
    res.send('this is a new jam...')
})


router.post('/contactme', function ({ body }, res) {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // Specify what the email will look like
    const mailOpts = {
        from: 'Your sender info here', // This is ignored by Gmail
        to: 'zgstowell@gmail.com',
        subject: 'New message from portfolio page!',
        text: `Message from: ${body.username}\n\n Email: ${body.userEmail}\n\n Message:\n ${body.userMessage}`
    }

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            console.log(error);
            res.send(error) // Show a page indicating failure
        }
        else {
            console.log(response);
            res.status(200).send('success') // Show a page indicating success
        }
    })

})



router.use('/api/comments', commentRoutes)
router.use('/api/users', loginRoutes)
router.use('/api/posts', postRoutes)
router.use('/api/tags', tagRoutes)

module.exports = router