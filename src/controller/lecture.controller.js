const express = require('express');
const  jwt  = require('jsonwebtoken');
const lecture = require('../model/lecture.model');
const router = express.Router();
const fileSystem = require('fs');
require('dotenv').config();
const verifyToken = (token) => jwt.verify(token , process.env.SECRET_KEY);


router.post('', async (req, res) =>
{
    const tokenValue = req.headers.auth;
    const finalToken = tokenValue.split(" ")[1];
    const {user} = verifyToken(finalToken);
    if (!user)
    {
        res.status(403).json({ "type": "unauthorize", "msg": "Invalide token" });
    }
    var findRole = user.roles.filter((value) => { if (value == 'admin' || value == 'instrutor') return value;});
     
    if (findRole.length == 0)
    {
        res.status(403).json({ "type": "unauthorize", "msg": "you can not access this operation" }); 
    }
    
    const postLecture = await lecture.create({

        'instructor': user._id,
        'batch':req.body.batch
    });


    res.status(201).json({ postLecture });

});


router.get('', async (req, res) => {
    const getlectuer = await lecture.find().populate('instructor').lean().exec();

    res.status(200).json({ getlectuer });
});

router.patch('/:id', async (req, res) => {
   
    try {
        const id = req.params.id;
        const { batch } = req.headers;
        const tokenValue = req.headers.auth;
        const finalToken = tokenValue.split(" ")[1];
        const { user } = verifyToken(finalToken);
        if (!user) {
            res.status(403).json({ "type": "unauthorize", "msg": "Invalide token" });
        }
        var findRole = user.roles.filter((value) => { if (value == 'admin' || value == 'instrutor') return value; });
     
        if (findRole.length == 0) {
            res.status(403).json({ "type": "unauthorize", "msg": "you can not access this operation" });
        }
    


        const patchdata = await lecture.findByIdAndUpdate(id, { batch }, { new: 1 });
        res.status(200).json({ patchdata });
    }
    catch(err)
    {
        res.json({ err });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await lecture.findOne({ id }).populate('instructor');
    if (!data)
    {
        res.status(400).json({ "type": "error", "msg": "not exist" });
    }

    var newadat = data.instructor.roles.filter((value) => { if (value == 'admin' || value == 'instructor') return value;});

    if (newadat>0)
    {
        res.status(403).json({ "type": "unauthorize", "msg": "you can not access this operation" }); 
    }

    const deleteLecture = await lecture.findOneAndDelete({ id });
    res.json({ deleteLecture });
});

module.exports = router;