const generatePresignedUrl = require('./generatePresignedUrl');
const request = require('request');

function uploadImg(avatar, userID) {
    
    return new Promise((resolve, reject) => {
      
      request.get(avatar).on('response', async function(res){
      let filename = 'profile_avatar.',
      type = '';
      
      type = res.headers['content-type'];
      filename = filename + type.split('/')[1];
      
      const uploadPayload = await generatePresignedUrl({filename, type, userID});
    const {url, imageName} = uploadPayload;
    
    await request.get(avatar).pipe(request.put(url));
    
    resolve(imageName);
    }); // end response
      
  });
   
}; // end uploadImg

module.exports = uploadImg;

