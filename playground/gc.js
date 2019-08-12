const express = require('express');
const app = express();
const debug = require('debug')('gc');
const expressFileupload = require('express-fileupload');
const path = require('path');
app.use('/', express.static(__dirname));
app.use(expressFileupload());

app.post('/', (req, res) => {
  const file = req.files;
  debug('req.files', file);
  res.send(file);
});
 
app.listen(5000, console.log('Gcloud server running on port 5000'));

/*
const {Storage} = require('@google-cloud/storage');
const path = require('path');

const gc = new Storage({
  keyFilename: path.join(__dirname, '../config/fattylee-storybook-img-458bbee95310.json'),
  projectId: 'fattylee-storybook-img'
});

// 'storybook-uploads'
const run = async () => {
  try {
   // const res = await gc.getBuckets();
   const sb = gc.bucket('storybook-uploads');
   // console.log('sb bucket', sb);
   let localFileLocation = path.join(__dirname, '../public/img/ajax-loader.gif');
  
   sb
   .upload(localFileLocation, { public: false })
   .then(file => { 
   // file saved 
   const name = file[0].metadata.name;
   console.log('saved file', name);
   console.log(getPublicThumbnailUrlForItem(name))
   });
   
   // get public url for filevar 
var getPublicThumbnailUrlForItem = file_name => { 
   return `https://storage.googleapis.com/${'storybook-uploads'}/${file_name}`;
   };
    
  }
  catch(ex) {
    console.error('err', ex)
  }
};
run();
*/