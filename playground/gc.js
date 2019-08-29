const express = require('express');
const app = express();
const debug = require('debug')('gc');
const expressFileupload = require('express-fileupload');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const uuid = require('uuid/v1');
const storage = require('../helpers/googleCloudService');

app.use('/api/upload', express.static(__dirname));
//app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use(expressFileupload());


app.post('/api/upload', async (req, res, next) => {
  debug('req.files', req.files, 'body', req.body);
  
  const {'file-avatar': file} = req.files;
const bucketName = 'storybook_uploads';
const filename = file.name;
debug('file', file, 'body', req.body, 'file.data', file.data);

const url = await generateV4UploadSignedUrl(bucketName, filename, file);

res.send({
  body: req.body,
  id: uuid(),
  url,
  buffer: file.data,
})
});


app.put('/xyz/upload', (req, res, next) => {

const {file} = req.files;
debug(file);

  
// create a bucket
 const bucket = google.bucket('storybook_uploads');
  
 
	// Create a new blob in the bucket and upload the file data.
 const blob = bucket.file(file.name);
	
	// Make sure to set the contentType metadata for the browser to be able
	// to render the image instead of downloading the file (default behavior)
	const blobStream = blob.createWriteStream({
	metadata: {
	contentType: file.mimetype
	}
	});
	
	blobStream.on("error", err => { 
	next(err);
	return;
	});
	
	blobStream.on("finish", () => {
	// The public URL can be used to directly access the file via HTTP.
	const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
	
	debug('Success', publicUrl)
	// Make the image public to the web since we'll be displaying it in browser
	blob.makePublic().then(() => {
	res.status(200).send(`<h1>Success!\n Image uploaded to <a href='${publicUrl}' target='_blank'>${file.name}</a></h1>`);
	});
	
});	

 blobStream.end(file.data);
 
});
 
app.listen(5000, console.log('storageloud server running on port 5000'));

const run = async() => {
  try {
const file_name = 'map/download (1).jpeg';
const bucketName = 'storybook_uploads';
//const res = await storage.bucket('storybook_uploads').file(file_name).delete()//.catch(debug);
//debug('file deleted', res, res.statusMessage, file_name);

const [files] = await storage.bucket(bucketName).getFiles();
debug('Files:'); files.forEach(file => { debug(file.name); });
}catch(ex) {
  debug(ex)
}
}
//run();
const bucketName = 'storybook_uploads';
const filename = 'la_galaxy.png';
const file = '';
//generateSignedUrl(bucketName, filename);
//downloadFile(bucketName,filename);
//generateV4UploadSignedUrl(bucketName, filename, file);


async function downloadFile(bucketName, filename) {
  const destination = path.join(__dirname, 'public/ajax-loader.gif',  );
  const res = await storage
    .bucket(bucketName)
    .file(filename)
    .download({destination});
    
    debug('res', res, `file downloaded to "${destination}"`);
}

async function generateSignedUrl(bucketName, filename) {
  // [START storage_generate_signed_url]
  // Imports the Google Cloud client library
//  const {Storage} = require('@google-cloud/storage');

  // Creates a client
 // const storage = new Storage();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const bucketName = 'Name of a bucket, e.g. my-bucket';
  // const filename = 'File to access, e.g. file.txt';

  // These options will allow temporary read access to the file
  const options = {
    version: 'v2', // defaults to 'v2' if missing.
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60, // one hour
  };

  // Get a v2 signed URL for the file
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    //.download({destination: './public/' + filename})
    .getSignedUrl(options);
    

  debug(`The signed url for ${filename} is ${url}.`);
  
  // [END storage_generate_signed_url]
}

async function generateV4UploadSignedUrl(bucketName, filename, file) {
 
  
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 120 * 60 * 1000, // 2hrs ,
    //contentType: file.mimetype, 
    contentType: 'multipart/form-data', 
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(filename) // this file will be save in gcp with this name
    .getSignedUrl(options);

  console.log('Generated PUT signed URL:');
  console.log(url);
  console.log('\n\n\n\n');
  console.log('You can use this URL with any user agent, for example:');
  console.log('\n\n\n\n');
  
  /*console.log(
    `curl -X PUT -H 'Content-Type: ${file.mimetype}' -T ./uploads/files/${filename} '${url}'`
  );*/
  //debug('typeof', typeof file, typeof file.data)
  return url;
  // [END storage_generate_upload_signed_url_v4]
  
  // upload file to gcp
 // const filePath = path.join(__dirname, '../public/img/', filename);
  
  (async function(){
const [files] = await storage.bucket('storybook_uploads').getFiles()
files.map(file => {
  if(file.name.startsWith('im')){
    debug(file.name)
  }
});

const slugsa = ['a-b-2', 'a-b','by','sd', 'aa-b'];

const createSlug = (title, slugs) => {
  let slugName = title.toLowerCase().replace(/\W+/g, '-');
  slugName = (slugName[slugName.length - 1] === '-') ? slugName.slice(0, slugName.length -1 ) : slugName;
  const originalSlug = slugName;
  let appendVersion = 0, count = 0;
 
   for (const zen in slugs) {
    debug('loop round: ', ++count, slugName);
     if(!slugs.includes(slugName)) {
    slugs.push(slugName);
    debug('slug added');
    return slugName;
  }
     else {
       debug('else:', slugName)
    const index = slugs.indexOf(originalSlug);
    slugName = `${originalSlug}-${++appendVersion}`;
    debug('slug already exist at index:', index);
  }
}
 
}; // end createSlug


//debug(files)

})//()
  /*
  axios.put(
    url,
    file.data, 
    { 
      headers: {'Content-Type': file.mimetype,} 
   }) 
   .then((response) => { //handle success 
   debug('response', response.status);
   })
   .catch((error) => { //handle error 
   debug('something went wrong:', error)
   });*/
   
   
   
   /*
   curl url // get request
   curl url -o/--output filename.txt // save the get request to filename.txt
   curl -O url // download to using the url extension name
   curl url -i // get request plus res info
   curl url -I/--head // headers info
   curl -d/--data "name=abu&title=fatty" url // post request
   curl -d 'baba=mumu&mama=smart' url -X PUT // PUT request 
   curl url -X DELETE // DELETE request 
   curl -u username:password url // protect a route
   curl http://google.com // it will show redirect page
   curl -L http://google.com // goto redirect page
   curl -u username:password url -T/--upload-file filename // upload file to the url
   curl -u username:password url -O filename // download file
   
   */
}