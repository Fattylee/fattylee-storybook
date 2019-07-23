const fs = require('fs');
const {join} = require('path')
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
console.log('last line', folder);