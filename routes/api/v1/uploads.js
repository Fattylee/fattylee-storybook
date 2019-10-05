const router = require('express').Router();
const debug = require('debug')('active:app');
const generatePresignedUrl = require('../../../helpers/generatePresignedUrl');


router.get('/', async (req, res) => {
  
  const {filename, type} = req.query;
  
  const  uploadPayload = await generatePresignedUrl({
    filename, 
    type, 
    userID: req.user.id,
    });
    
  res.status(200).send(uploadPayload)
});
   
module.exports = router;
