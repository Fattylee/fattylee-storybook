const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');

//console.log(faker);
// model and schema definition
const Mango = mongoose.model('Mango', {
  name: { type: String, required: true},
  avatar: { type: String, },
  fileName: {type: String, },
});

//mongoose connection
mongoose.connect('mongodb://localhost/expert', {useNewUrlParser: true, useCreateIndex: true}).then(res => {
  console.log('connected to mongodb(test)');
})
.catch(err => console.error('Could not connect to db(test)'));


const create =  async (obj) => {
  try {
    const newMango = await  Mango.insertMany(obj);
    
    console.log('mangoes',JSON.stringify(newMango, null, 2));
    
    //await User.findByIdAndRemove('5d23b2e8ff4f5322ac5fb8ad');
    
  }
  catch(err) {
    console.log(err);
  }
}; // end create

const fetch = async () => {
   const mangoes = await User
   //.countDocuments();
   .find({
     //name: {$regex: /^\w+ \w+$/i},
     //avatar:  {$regex: /.*/}, // 
     //fileName:  {$regex: /.*/i},
     //updatedAt: undefined,
     //password: undefined,
       //date: {$regex: /.*/}
     })
     .limit(599)
     //.sort({createdAt: -1});
     
     //mangoes[0].photo = undefined;
     //await mangoes[0].save();
      console.log('mangoes',JSON.stringify(mangoes, null, 2), 'Counts: ', mangoes.length);
};



const obj = {
  name: 'black mango',
};

const deleteMango = async () => {
  const deleted = await Mango.deleteMany(
  {
    fileName: null,
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
  const newUsers = await User.updateMany(
  {},
  {
    //$set: {avatar: 'placeholder.png'},
    $unset: {date: ''}
    
    }, {new: true});
  console.log(newUsers);
}
const mangoesArr = new Array(100).fill(0).map(m => ({
  name: faker.name.findName(),
  avatar: faker.image.avatar(),
  fileName: faker.system.fileName(),
  }));
//console.log(mangoesArr);


//create(mangoesArr);
fetch();
//deleteMango();
//update();
//updateManyUsers();

