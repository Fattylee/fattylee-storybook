// get data every time
const valueHandler = firebase.database().ref().on('value', (snapshot) => {
  const val = snapshot.val();
  console.log('data:', val);
}, (err) => {
  console.log('err:', err);
});

// get data once
firebase.database().ref().once('value', (snapshot) => {
  const val = snapshot.val();
  console.log('data:', val);
}, (err) => {
  console.log('err:', err);
});

// create or update 
firebase.database().ref().set({
  name: 'Abu Adnaan',
  age: 32,
  location: {
    city: 'lafemwa',
    state: 'ogun',
    country: 'nigeria',
  },
  job: 'software engineer',
  isMarried: true,
});

// update
firebase.database().ref().update({
  'location/city': 'vespa',
});

// delete
firebase.database().ref('age').remove();

// unsubscribed
firebase.database().ref().off(valueHandler);


// create array like structure on the firebase server
firebase.database().ref('expenses').push(
{
  note: 'note 1',
  description: 'description 1',
  amount: 23,
  createAt: 26363737,
});
firebase.database().ref('expenses').push(
{
  note: 'note 2',
  description: 'description 1',
  amount: 23,
  createAt: 26363737,
});
firebase.database().ref('expenses').push(
{
  note: 'note 3',
  description: 'description 1',
  amount: 23,
  createAt: 26363737,
})
.then(ref => {
  console.log('added', ref)
})
.catch(err => {
  console.log('err', err);
});

let expenses = [];

firebase.database().ref('expenses').once('value')
.then(snapshot => {
  snapshot.forEach(childSnapshot => {
    expenses = [
    ...expenses,
    {
      id: childSnapshot.key,
    ...childSnapshot.val(),
    }];
  });
})
.catch(err => {
  console.log(err);
});


firebase.database().ref('expenses').on('value', snapshot => {
  snapshot.forEach(childSnapshot => {
    expenses = [
    ...expenses,
    {
      id: childSnapshot.key,
    ...childSnapshot.val(),
    }];
  });
}, err => {
  console.log(err);
})

/*
Other event subscription
value,
child_changed
child_removed
child_added // alert existing data and new data

*/






