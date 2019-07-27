import express from 'express';
const obj = {
  person: { name: 'abu',  age: 32,
    //sex: 'female',  family: { baby: 56} 
    
    },
};

const {name = 'faker', age, sex = 'male'} = obj.person || {};
console.log(name, age, sex,)