const router = require('express').Router();
const storage = require('../helpers/googleCloudService');
const createSlug = require('../helpers/createSlug');
const debug = require('debug')('active:app');


router.get('/', async (req, res) => {
  
  const {filename, type} = req.query;
  debug(filename, type);
  
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
   .getSignedUrl(options);
   
  res.status(200).send({
    uploadPayload: {
      url,
      imageName,
    }
  })
});
   
module.exports = router;
