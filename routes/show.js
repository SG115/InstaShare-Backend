const router = require('express').Router();
const File = require('../models/file');    // Schema Model ........importing database already created in files.js

router.get('/:uuid', async (req,res) => {              // : (colon) is used because uuid is a dynamic parameter
    try
    {
        const file = await File.findOne({ uuid: req.params.uuid})                // finding document(row) in the database correspoding to requested UUID

        if(!file){
            return res.render('download', { error: 'Linked Expired :('});
        }

        return res.render('download', { 
            // now download page will contain mainly 3 information: 
            /*
            1. File Name
            2. File Size
            3. Download Link
            */

            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size, 
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } 
    catch(err) {
        return res.render('download', { error: 'Something fishy in rendering download page'});
        // Now we are sending the file (data) to created download page in the views folder
        // EJS will by default look into the views folder and find the 'download' file.
    }
});

module.exports = router;