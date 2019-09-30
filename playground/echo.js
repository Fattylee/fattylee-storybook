const debug = require('debug')('api:req'); 


const isParlindrome = (str) => str.toLowerCase() === str.toLowerCase().split('').reverse().join('');

const chunkArr = (arr, size) => {
  const res = [];
  
  for (const el of arr) {
    const last = res[res.length - 1]
    if(!last || last.length == size) {
      res.push([el]);
    }
    else {
      last.push(el)
    }
  }
  return res;
}

const chunkArrSlice = (arr, size) => {
  const res = [];
  let count = 0;
  
  while (count < arr.length) {
    res.push(arr.slice(count, count + size));
    count += size;
    
  }
  return res;
}
//console.log(chunkArrSlice([12,2,5,6,'tt'], 3));

const charMap = (str) => {
const charMap = {};
for(const ch of str) {
  charMap[ch] = !charMap[ch] ? 1: ++charMap[ch];
  // charMap[ch] = charMap[ch] + 1 || 1;
  }
return charMap;
};
const pureStr = str => str.replace(/[_\W]/g, '').toLowerCase();

const anagram = (str1, str2) => {
  const pStr1 = pureStr(str1);
  const pStr2 = pureStr(str2);
  
  if(pStr1.length !== pStr2.length) return false;
  const charMap1 = charMap(pStr1);
  const charMap2 = charMap(pStr2);
  for(const ch in  charMap2){
    if(charMap2[ch] !== charMap1[ch]) return false;
  }
  
  return true;
};

const anagram2 = (str1, str2) => {
  const cleanUp = (str) => str.toLowerCase().replace(/[_\W]/g, '').split('').sort().join('');
  console.log(cleanUp(str1), cleanUp(str2))
  if(cleanUp(str1) !== cleanUp(str2)) return false;
  return true;
};

const capitalize = (str) => {
  return str.split(' ').reduce((res, word) => res + " " + word[0].toUpperCase() + word.slice(1), '').slice(1);
};

const capitalize1 = (str) => {
  let index = 0;
  let res = '';
  for (const ch of str) {
    if(str[index - 1] === ' ' || index === 0) {
      res += ch.toUpperCase();
      ++index;
      continue;
    }
    res += ch;
    index++;
  }
  return res;
};

const capitalize2 = str => {
  let index = 1, res= '';
  const strLen = str.length;
  res += str[0].toUpperCase();
  
  while(index < strLen) {
    if(str[index - 1] === ' ') {
      res += str[index].toUpperCase();
      ++index;
      continue;
    }
    res += str[index];
    ++index;
  }
  return res.trim();
};


const stepsLeft = num => {
  let index = 1;
  while( index <= num) {
    const str = ''.padEnd(index, '#');
    debug(str.padEnd(num, ' '));//.padStart(num * 2, ' ');
    ++index;
  }
};

const steps = num => {
  let index = 1, num1 = num;
  while( index <= num) {
    const str = ''.padEnd(index, '#');
    debug(str.padStart(num/2, ' ')//.padEnd(num1--, ' ')
    );
    ++index;
  }
};

const printNumber = (num , dec ) => {
  if(num <= 0) return;
  
  debug(num);
  printNumber(num - dec, dec);
};

const factorial = num => {
  if(num < 2) return 6;
  debug('peint', num)
  return factorial(num - 1) + 1;
}
const str = '   lulu_Yu55 baaa!!! log mark, toLowerCase.'.padEnd(100, '===');

const stepsR = (n, row =0, stair = '') => {
  
  if(row === n) {
    return;
  }
  if(stair.length === n) {
    debug(stair);
    return stepsR(n, row + 1);
  }
  
  if(stair.length <= row) {
    stair += '#';
  }
  else  {
    stair += ' ';
  }
  stepsR(n, row, stair)
  
};

const capitalizeR = (str, c=0, res='') => {
 
  if(str.length === c) {
    
    return res;
  }
  if(c === 0) {
    res += str[0].toUpperCase();
     capitalizeR(str, c + 1, res);
  }
  if(str[c - 1] === ' ') {
    res += str[c].toUpperCase();
    return capitalizeR(str, c + 1, res);
  }
  else {
    res += str[c];
    return capitalizeR(str, c + 1, res);
  }
   
};

const isPalindromeR = (str, reversed = '', index = 0) => {
  
  if(str.length === index) {
   return reversed.toUpperCase() === str.toUpperCase(); 
  }
 
  return isPalindromeR(str, reversed + str.charAt(str.length - index -1 ), index + 1);
};


const o = {
  name: 'Abu Adnaan',
  'city-name': 'Itele',
};
/*
let para = document.querySelector('p');
let compStyles = window.getComputedStyle(para); 

console.log(compStyles.getPropertyValue('color'));
*/
let counter = 0;
//debug(isPalindromeR('abuutbA'));
//debug(capitalizeR('abu next streewr'));
//stepsR(20);
//debug('isPalindrome', isParlindrome('boB'));
//debug(factorial(12));
//printNumber(20, 3);
//steps(5);
//debug(capitalize2(str));//console.log('is anagram:', anagram2('5abu+-', 'uba5'))
//console.log(charMap(str));

