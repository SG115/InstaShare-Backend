const router = require('express').Router();
const File = require('../models/file');



router.get('/:uuid', async (req,res) => {
    // fetching file in database using uuid
    const file = await File.findOne({ uuid: req.params.uuid });

    if(!file)
    {
        return res.render('download',{ error: 'Link Expired :('});
    }
    
    const filePath = `${__dirname}/../${file.path}`;


    // Downloading in express is quite easy...just use res.download(filepath)
    res.download(filePath);
});



module.exports = router;