import http from 'http';
const fs = require('fs');
const request = require('request');
const axios = require('axios');
const debug = require('debug')('api:req');
const generatePresignedUrl = require('../helpers/generatePresignedUrl');


function download(url, dest, callback) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(callback); // close() is async, call callback after close completes.
        });
        file.on('error', function (err) {
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            if (callback)
                callback(err.message);
        });
    });
}

let url = 'https://lh5.googleusercontent.com/-9A-PMOwOblU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdaUKNM9pn8GdqTVSsJZ9SdUuaSQw/photo.jpg';

//url = 'https://google.com';
const dest = './';
//download(url, dest,  )



/*request(url, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode, ); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
});
*/

//request(url).pipe(fs.createWriteStream('abu.jpg'));

//url = 'https://storage.cloud.google.com/storybook_uploads/images.png';
//url = 'https://00e9e64bac4feae5f1ab0471ec7a86f7d5abcbc131a715ed62-apidata.googleusercontent.com/download/storage/v1/b/storybook_uploads/o/123456789%2Fxx-1cc76560-d4f0-11e9-a1fa-b104d0755db7.xxx?qk=AD5uMEt83W1mXn5DIaoHW-el_xYK2Z5_ZchohDLiL8GW9nJM4Y0ditU7qBNGWRBLQ4wIoLHHaIqt2d7GDNG0nTco0rfFqSW-0AE7EdTSXAgFS0I5sOXirVzAUQHr2ASOoCcy1k-yCQl2BF4yS0rUqP5ciGIMrUkWkPzqvH5b2K9pUT2DI-7XIJwBbS7l7YuKqJ_iLS4F47tzphD247XPQumH3Oqvx-LhLowOnosrCFJHqVSuAHPp7qiF4hPaSYB3N8-hhvJwouYeghaDWsyyHQupTxGR1LgRd7feiU_sPeyDV2CWIbL3OzJXMbLhN1YhXMURsrYXt_i3mHbaQ0NgtNhempCa_BrowDQCElEIRdjkNLrkoVvIAz8aJ6OOzq5zAnVItn5nRbJHGpkMJo7BHPZSFqIo3ZdmroIoNc0DRWt8ET76WjPL2hxN5pk4Rgb5P395Txr0ox37FNcPVOoJnjQQsgvrHbZYAvXHXXQVPeG1MVc7GcixMsoZiyM7wClcVFMp7Z4mkvlCxP-Ir-ge5v39pKCcB9FgQdn-VmK0Yar-d2zrJ5JaT7XcVD4PZKJqS4Yj0cOz3S-_3Wug32eSAZAcuvZhtazs1UMGxjd0X8mcSjHBWX2ExfxxQyBKeZ6sTxEAP8dC1v2AyCpZejK0QdiWU3UGb6HKO8TfHjU8I55Ppe8jzMhutSQYHR9nL8t1gXs-igVk4yPmjuFLLiw_cLjmsqg5gFZW9_D4fIf7s4z1REW_0bN-yXaFphulNO2NrxXAeivKO0Xkuv1KNgCvr5VLJSNBa5ZWknkirwhSNHIZlNbAKw-sHSzcbdWWDEsin9JhBsSerISQZi1zdfqqyaRCdGAjuXoA9Zj0kzCz6W2BEnE5OWBwE3Q';

//url = 'https://00e9e64bacd104277cd80e05a3575cbbffffe47d193eb23830-apidata.googleusercontent.com/download/storage/v1/b/storybook_uploads/o/123456789%2Ffile-b58daa50-d524-11e9-b163-9527b82f9390.json?qk=AD5uMEvRNiLdjawR8fkiZJoW6GkgzZ2mfVnS-zGs6z4WZPHssI0BpE2rPSmRf_j-XvRo2TuUyEWJGFR1Lc_yxOLX2BToYleQEcqmDGiZwZYGxwcVWc2wwu-4mYbO6prMvBudhVP0aGRsNAg7_ErrJa4wDXmo4wgliyz-i6QBu1PEt4ZBBz6BNm4iczatsWrD0JSzUNyBsG9djdEQZzo5S2nyiqTLvJIjfJqkVcTqebqFQE9LH0TUFJcgoN0R2F4I7x7iTZsm5SQ6BHhe72ljaLs84rVzT6H92MURqzZrOywet8OubedwP0vIW6JcwxJznoHuksqNaogwvLd4yFUgG0ckng5pxD5MMJm_1Z9q24AvzTMJAS9CNATVqd_MXdlzGq5669Dj9swY23gwc8Viufb64NbybaDzM5Mjlhxpmmlu1071DXr3R7mxkLglWDPFRErX7ShRRFMmkeP2KbpM5J30YcllBq6tmO2wuRxQN-24FsWkaydPUjT6DeFIbYOhnVTRwjMZIff4Qc4e12FrBl_5COclxSW5WzIzOhxj8taIR51CnY4rBYO-P9YFfZQpCTe5wBi-qDoK-gJLTs2bNtZpRoLUfYe40ATD78Y1lEaCgTYujedbhC8HoeK8QpKKCWeFrjxfqewdp0UQQF6p16DHyt2O1na1Ux9NKDEAD5kNGW8loqVnzQFzTIBOG9Z3EHxg3-pNwZejEDz9F5wOUXU7pcqd90Gbb9NX09BLawqzE_3izdBkl6hE-ARGNDkdZJkssTVWUJYlR0mDko-eIbg7SAMcxIeVMGIWNZgk4R8NP_v6CckLTg_HwitLXiNfyxbWi_zs85ggbh0zgZF9V0YY1i7VKbkKDHu9grAJ45QjoPUI6AQdW2w';

async function run() {
    let filename = 'abc.gif',
    type = 'image/png';
   // type = 'text/html';
   //type = 'application/javascript';
    //type = 'image/jpg';
   
   const userID = '5d7a618c3bcdf1676daf9633';
    try {
    const uploadPayload = await generatePresignedUrl({filename, type, userID})
    
    
    debug('after generatePresignedUrl await');
    const uploadUrl = uploadPayload.url;
    console.log('uploadUrl', uploadUrl);
  
  /*request.get(url)
  .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
  .pipe(request.put(uploadUrl));*/
  
  //fs.createReadStream('index.js').pipe(request.put(uploadUrl));
 
  //request.get(url).pipe(request.put(uploadUrl))
  const res = await request.get(url)
  /*.on('response', function(response) {
      console.log(response.statusCode) // 200
      //console.log(response.headers['content-type']) // 'image/png'
      debug(response.headers);
    });*/
    
debug('after request', res)
//await axios.get(url).pipe(axios.put(uploadUrl));

  }
  catch(err) {
     debug(err)
     
     };
};

run();