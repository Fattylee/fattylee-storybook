/*
const people = [
  {name: 'abu adnaan', age: 23},
  {name: 'ummu abdillaah', age: 3},
  {name: 'smith', age: 13},
  {name: 'abu lubaaba', age: 43},
];*/

require('./mongoose');
const obj = {
  person: 'Elite',
  salary: 56775333,
  people:  [
  {name: 'abu adnaan', age: 23},
  {name: 'ummu abdillaah', age: 3},
  {name: 'smith', age: 13},
  {name: 'abu lubaaba', age: 43},
]
};

//console.log('without sort:', JSON.stringify(people, null, 2));
/*
console.log('b4:', obj);

obj.people.sort((a,b) => -a.age + b.age);
console.log('desc sort:', JSON.stringify(obj.people, null, 2));

console.log('after:', obj);*/

let str = '<p>paragrap</p><p></p>';

let reg = /<p>.{0,}?<\/p>/ig;


str = 'ape is big\ncheetah is fast\nturtle is slow';

reg = /^\w+?\b/igm

str = 'this is a cat  cat befor   befor yhemhem';
reg = /(\w+)(?:\s*\1)/ig;

str = '080-6287-0354';
reg = /(\d{3})-(\d{4}-\d+)/;

str = 'https://www.youtube.com http://www.goohle.com';
reg = /(https?:\/\/)(.*?.com)/ig;

str = 'fatai, balogun, shola,  haleemah';
reg = /\w+(?=[, ]+)/ig; // look ahead

str = 'Who break the covenant of Allah after contracting it and sever that which Allah has ordered to be joined and cause corruption on earth. It is those who are the losers.';
reg = /\b[\w ]+?(?=\s+Allah)/ig

str = '1. Bread 2. Sugar 3. apples';
reg = /(?<=\d\.\s+)\w+/ig;  //look behind

str = '<h1>I am important</h1> <h1>so am i</h1>';
reg = /(?<=<h1>)[\w ]+(?=<\/h1>)/ig;

str = '23-06-1987 23-06-2087';
reg = /(\d{1,2})-(\d{1,2})-(\d{4})u/ig;
str = 'b';
reg = /b|a*/i
console.log(str, ' ======= ', reg)
//const res = [...str.matchAll(reg)];
//const res = str.replace(reg, '<a href="$1$2">$2<\/a>\n')
//const res = [...reg.exec(str)];

//const res = [...str.matchAll(reg)];
let res = str.search(reg);
res = [...str.matchAll(reg)];
res = str.match(reg);

console.log(res, new Date(1987,16,1,5,45,34))