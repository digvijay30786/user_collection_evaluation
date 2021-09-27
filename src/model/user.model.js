const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type:String,required:true},
    email: { type:String,required:true},
    password: {type:String,required:true},
    profile_photos_url: {type:String,required:false,default:"https://imgur.com/bbiFt7O.png"},
    roles: [{ type: String, required: true }]
});

userSchema.pre("save",function (next) {
    try {
        if (!this.isModified('password')) return next();

        const hash = bcrypt.hashSync(this.password, 8);

        this.password = hash;

        next();
    }
    catch(err)
    {
        next(err);
    }
})

module.exports = mongoose.model("user", userSchema);