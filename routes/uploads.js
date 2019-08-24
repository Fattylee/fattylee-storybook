const router = require('express').Router();
const storage = require('../helpers/googleCloudService');
const createSlug = require('../helpers/createSlug');
const debug = require('debug')('active:app');


router.get('/', async (req, res) => {
  
  const {filename, type} = req.query;
  debug(filename, type);
  
  const imageName = createSlug(filename, req.user.id);
  debug('imageName', imageName)
  
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 120 * 60 * 1000, // 15 MIN ,
    contentType: type,
  };
   
 const [url] = await storage
   .bucket('storybook_uploads')
   .file(imageName)
   .getSignedUrl(options);
   
   const uploadPayload = {
      url,
      imageName,
    };
    debug(uploadPayload);
  res.status(200).send(uploadPayload)
});
   
module.exports = router;