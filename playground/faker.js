const faker = require('faker');
const debug = require('debug')('active:app');
const uploadImg = require('../helpers/uploadImg');
const Story = require('../models/Story');

//debug(faker);
for (const prop in faker.lorem){
  //debug('prop:', prop, '==', faker.lorem[prop]());
}
//debug('=', String.prototype, );

//faker.image.image()
const url = 'http://lorempixel.com/150/150';
/*uploadImg(url, '777')
.then(res => {
  debug('res', res);
  debug(`https://storage.cloud.google.com/storybook_uploads/${res}`)
})
.catch(debug);
*/
let storyCount = 0;
const createStory = async () => {
  try {
  const url = 'http://lorempixel.com/150/150';
  const userID = '5d8735ea2222a019e08c19e3';
const storyImage = await uploadImg(url, userID);
//debug('storyImage', storyImage);
  const newStory = new Story({
      title: faker.lorem.sentence(),
      details: faker.lorem.paragraphs(),
      status: 'public',
      allowComments: true,
      storyImage,
      user: userID,
    });
  // debug('newStory', newStory);
    const story = await newStory.save();
    debug('saved', ++storyCount, );
  }
  catch(err) {
    debug('error:', err);
  }
};


const count = 100;
new Array(count).fill(0).forEach(createStory);
//createStory();
debug('faker faker faker', count);