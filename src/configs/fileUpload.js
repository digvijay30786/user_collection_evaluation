const multer = require('multer');
const path = require('path');
const { v4: uuid } = require('uuid');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, callback) => {
        
        const encrypt = uuid()+'-' + Math.round(Math.random() * 1E9);
        callback(null, encrypt + file.originalname);
    }
});


const fileFilter = (req,file,callback) => {
    
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')
    {
        callback(null, true);
    }
    else
    {
        callback(null, false);
    }
}


module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
});