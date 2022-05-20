const router = require('express').Router();
const multer = require('multer');
const File = require('../models/file');    // Schema Model
const { v4: uuid4 } = require('uuid'); 

// Template Multer Code for storing files in the database.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
//

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

router.post('/',(req,res) => {
    // Store File
    upload(req,res, async (err)=>{
        // Validate Request
        if(!req.file){
            return res.json({ error : 'File Not Found.'});
        }
        if(err){
            return res.status(500).send({ error: err.message });
        }
        // Store in Database
        // creating new schema object
        // When you create a new File instance ...... new collection is created in the database.
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),                   // uuid is used to generate unique shareable url link to share
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        console.log('File is Saved.')
        // Response -> Shareable Link
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`})
        // http://localhost:5000/files/545454d4df4vs35454-5ds454dsss      ->     Link to share
    })
});

module.exports = router;