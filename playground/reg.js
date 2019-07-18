let reg = /for(?:bar)?/ig;
let str = 'hfor  for.bar forbar forbe';

let res = str.replace(reg, '*');
/*
res = str.replace(reg, (match, group1) => {
  console.log(match);
  if(match.length > 4) {
    return match.toUpperCase() + group1;
  }
  return '*';
});
*/
str = `<a href='http://www.google.com'>Google</a>`;
reg = /<(.*?)>\w+<\/.*>/ig;
reg = /<(a href=["']http:\/\/www.google.com["'])>\w+<\/.*>/ig;
let rep = '*$1';

res = str.replace(reg, rep);
console.log('str:', str, '\nreg:', reg, '\nreplacement:', rep);
console.log('res:', res);