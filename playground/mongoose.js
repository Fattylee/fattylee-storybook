const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Story = require('../models/Story');
const debug = require('debug')('debugger');
//console.log(faker);
// model and schema definition
const Mango = mongoose.model('Mango', {
  name: { type: String, required: true},
  avatar: { type: String, },
  fileName: {type: String, },
});

//mongoose connection
//mongoose.connect('mongodb://localhost/test',
mongoose.connect('mongodb://localhost/expert',
 {useNewUrlParser: true, useCreateIndex: true}).then(res => {
  console.log('connected to mongodb(test)');
})
.catch(err => console.error('Could not connect to db(test)'));

const create =  async (obj) => {
  try {
    const newMangoes = await  Mango.insertMany(obj);
    
    console.log('mangoes',JSON.stringify(newMangoes, null, 2));
    
    //await User.findByIdAndRemove('5d23b2e8ff4f5322ac5fb8ad');
    
  }
  catch(err) {
    console.log(err);
  }
}; // end create

const fetch = async () => {
  /*
   const stories = await Story
   //.countDocuments();
   .find({
     //name: {$regex: /^\w+ \w+$/i},
     //avatar:  {$regex: /.}, // 
     //fileName:  {$regex: /.i},
     //updatedAt: undefined,
     //password: undefined,
       //date: {$regex: /.}
       //name: {$regex: /^\w+ \w+$/},
     })
     .select('comments')
     .limit(599)
     //.sort({createdAt: -1});
     
     //mangoes[0].photo = undefined;
     //await mangoes[0].save();
     
      console.log('Stories',JSON.stringify(stories, null, 2), 'Counts: ', stories.length);
      */
      
      const story = await Story.findById("5d34b37ceb09cb558aa63662");
      
      debug('isFrozen:', Object.isFrozen(story));
      debug('isSealed:', Object.isSealed(story));
    debug(typeof story, 'typeof story');
      story.nextLevel = 'zero and zero next level \n again level Promise 1234567';
      story.play = 2345;
      console.log('story',JSON.stringify(story, null, 2));


};



let obj = {
  name: 'black mango',
};

const deleteMango = async () => {
  const deleted = await Mango.remove( //.deleteOne(
  {
    //_id: "5d38a97e7084dd546dd08d2c"
   // fileName: null,
    //name: {$regex: /^\w+ \w+$/},
  });
  console.log('deleted mango', deleted);
  fetch()
}; // end deleteMango

const update = async () => {
  /*
 const mangoes = await Mango.find();
 mangoes.map(m => {
   m.fileName = faker.name.findName();
   return m.save();
 });
 const updated = await Promise.all(mangoes);
 */
 
 
  const updated = await Mango.updateMany(
  {
    name: {$regex: /^\w+ \w+$/i},
  },
  {
    //$unset: {fileName: 'hmmkj'},
    $set: {fileName: faker.system.fileName()}
  }, {new: true});
  
  console.log('updated', updated);
  fetch()
}; // end update

const updateManyUsers = async () => {
  /*const users = await User.find({
    createdAt: undefined,
  });
  users.map(u => {
    const date = u.date;
    u.date = undefined;
    u.createdAt = date;
    return u.save();
  });
  const newUsers = await Promise.all(users);*/
  const newUsers = await Mango.updateMany(
  {name: {$regex: /^\w+ \w+$/}},
  {
    $set: {fileName: 'aaabbb'},
    //$unset: {date: ''}
    
    }, {new: true});
  console.log(newUsers);
}
const mangoesArr = new Array(10).fill(0).map(m => ({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  fileName: faker.system.fileName(),
  }));
//console.log(mangoesArr);


//create(mangoesArr);
//fetch();
//deleteMango();
//update();
//updateManyUsers();


/*
const o = {};
debug(o);
o.name = 'hi guys';
debug('b4: ', o);

Object.defineProperty(o, 'sex', {
  value: 'male',
  writable: true,
  enumerable: true,
});

o.sex = 'female';
o.name = 'new'
debug(o, o.sex)
*/

obj = {name: 'abu'};
const obj1 = obj;
debug(obj, obj1)

obj1.name = 'fake';
debug(obj, obj1)