const storage = require('./googleCloudService');
const createSlug = require('./createSlug');

const generatePresignedUrl = async (data = {}) => {
  const {filename, userID = 123456789, type} = data;
  const imageName = createSlug(filename, userID); 
  
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
   .catch(err => { throw new Error(err) });
  
   const uploadPayload = {
      url,
      imageName,
    };
    
    return uploadPayload;
};

module.exports = generatePresignedUrl;

