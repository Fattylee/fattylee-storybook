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

const str = 'lulu_Yu55 baaa!!!';

console.log('is anagram:', anagram2('5abu+-', 'uba5'))
//console.log(charMap(str));