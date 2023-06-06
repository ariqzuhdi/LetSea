const express = require('express');
const router = express.Router();
const { login } = require('../controller/login');

router.post('/login', login)
router.get('/cek', (req, res) => {
    res.json("yesssss")
})




module.exports = router;