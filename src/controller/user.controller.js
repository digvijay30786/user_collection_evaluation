const express = require('express');
const user = require('../model/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const newToken = (user) =>  jwt.sign({ user }, process.env.SECRET_KEY);
const router = express.Router();
const upload = require('../configs/fileUpload');
router.post("", upload.single('avatar'),async (req, res) =>
{
    try {
        const { name, email, password, roles } = req.body;
        const postUser = await user.create({
            name,
            email,
            'profile_photos_url':req.file.path,
            password,
            roles
        });

        const token = newToken(postUser);

        res.status(201).json({token});
    }
    catch (err)
    {
        res.status(400).json({ "type": "error", "mag": err.message });
    }
});


module.exports = router;