const promise = () => new Promise((re, rj) => {
  setTimeout(() => {
    console.log('first if');
    re('i am resolved');
  }, 2000);
});
const promise2 = () => new Promise((re, rj) => {
  setTimeout(() => {
    console.log('second promise');
    re('thanks');
  }, 2000);
});


const run = async () => {
  console.log('before any if');
  
 if(true){
    const res = await promise2();
    console.log(res);
  }
  console.log('between promise');
  if(true){
    const res = await promise();
    console.log(res);
  }

  console.log('after first if');
  
};

run();

