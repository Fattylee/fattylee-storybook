//import fs from 'fs';
const fs = require('fs');
const util = require('util')
const fse = require('fs-extra');
const EventEmitter = require('events');
const os = require('os')
const {join, parse} = require('path')

//console.time('100-elements'); 
fs.writeFile('public/file1.txt', 'abu is such a', (err) => {
  if(err) throw (err);
  console.log('completed!');
});

/*
for (let i = 0; i < 100000; i++) ; console.timeEnd('100-elements'); // prints 100-elements: 225.438ms
*/
const folder = join(__dirname, '../public/img/');
fs.readdir(folder, (err, files) => {
  if(err) throw err;
  console.log(files);
  files.forEach(file => {
    if(/[.]jpg$/.test(file))
    fs.unlinkSync(join(folder, file));
  })
})
//console.log('last line', folder);

console.log('__filename',__filename, '__dirname', __dirname, 'path.parse', parse(__filename), 
'\nuptime', os.uptime(), 
'\nfreemem', os.freemem(),
'\ntype', os.type(),
'\nreaddir:', fs.readdirSync(__dirname),
);
const { emitter, MyEvent } = require('./event');
const hack = new MyEvent();

//emitter.on  -- preferred to addListener
//emitter.once
emitter.addListener('appWorking', (arg) => {
  console.log("appWorking event:", arg)
});
hack.on('hacker', (arg) => {
  console.log("hacker event:", arg)
});

hack.hacker();

emitter.emit('appWorking', {id: 1, name: 'Abu'});
emitter.emit('appWorking', {hacker: 'Latest Hacker'})


//const Joi = require('./joi');
//console.log('my name is:', Joi);
const run = async () => {
  const files = await fse.readdir(__dirname);
  console.log('my list of files:', files);
};

//console.log('fse', fse.promises);
run();
/*fse.readdir(__dirname, (err, files) => {
  console.log('my list of files:', files)
})*/
console.log('util.promisify', util.isObject({}));
