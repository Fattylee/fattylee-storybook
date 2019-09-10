const router = require('express').Router();
const storage = require('../helpers/googleCloudService');
const createSlug = require('../helpers/createSlug');
const debug = require('debug')('active:app');


router.get('/', async (req, res) => {
  
  const {filename, type} = req.query;
  
  const imageName = createSlug(filename, req.user.id); 
  
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 MIN ,
    contentType: type,
  };
   
 const [url] = await storage
   .bucket('storybook_uploads')
   .file(imageName)
   .getSignedUrl(options)
   .catch(err => {
     debug(err);
   });
   
   const uploadPayload = {
      url,
      imageName,
    };
    // debug(uploadPayload);
  res.status(200).send(uploadPayload)
});
   
module.exports = router;
