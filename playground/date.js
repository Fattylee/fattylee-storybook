const date = new Date();
console.log('date', date);
const date2 = new Date('2019-07-14T08:05:32.160Z');
console.log('date2', date2);

const obj = { name: 1, age: 67, man: {
  son: 'ok'
}};
console.log('obj.hasOwnProperty()', obj.hasOwnProperty('sex'), Boolean(obj.sex), !!obj.sex);

const isEmpty = (obj) => {
  for(const prop in obj){
    if(Object.prototype.hasOwnProperty.call(obj, prop)){
      return false;
    }
  }
  return true;
};


console.log(isEmpty({n:6}));
//console.log('\n================',Object.getOwnPropertyNames(obj));
/*
var buz = { fog: 'stack' }; 
for (var name in buz) { 
  if (buz.hasOwnProperty(name))
  { 
    console.log('this is fog (' + name + ') for sure. Value: ' + buz[name]); 
    }
 else {
    console.log(name); // toString or something else 
    
    } 
 }*/

