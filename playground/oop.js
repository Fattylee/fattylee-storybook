

// OOP IN JAVASCRIPT
// global js code
function Conc(name) {
  // instance / public field
  this.name = name;
  this.age = 32;
  
  // private field
  const privateVar = 'remain private';
  
  // private func
  var priMyName = function () {
    return this.name;
  }
  
  // instance / public func aka priviledged func
  this.priviledge = function () {
    return 'na me be priviledged func';
  }
  
  // private function
  function pubFunc() {
    return 'see pubFunc ooo';
  }
  
 
  
  // static field
  Conc.sex = 'male';
  Conc.count = ++Conc.count || 1;
  
  
};// end Conc contructor function

/*
// public func exist on __proto__ obj
Conc.prototype.prop = function() {

  Conc.sex = 'female';
  return this.name + this.age + Conc.sex;
};

Conc.getName = function () {
  return Conc.count;
};

function Another(name) {
  this.name = name;
};


var objConc = new Conc('Abu Adnaan');

// pass all from Conc the prototype obj to Another instance
//Another.prototype = Object.create(Conc.prototype);

Another.prototype = objConc;

const ano = new Another('Another name');

//console.log(objConc.prop(23,77), objConc.privateVar )
for (const key in ano){
  if(ano.hasOwnProperty(key)){
    //console.log(key, typeof ano[key])
  }
}


new Conc('next man');
//console.log(ano);

//console.log(Another, 'hasOwnProperty: ', )


const alert = (msg) => {
  console.log(msg);
};

//alert(56 + ' backgroundColor alert' );
//alert('hi guys alert')
//document.cookie=`gender=${'male'};expires=${new Date('23 jun 2020 11:34:59')};`;
const arr = document.cookie.match(/(?<=\w+=)\w+/ig)
console.log(document.cookie);
console.log(arr)
*/