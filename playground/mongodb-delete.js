const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Users').deleteMany({name: 'Dimitar'}).then((result) => {
  //   console.log(result.result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID('594d5513a4c60534592fb556')}).then((result) => {
    console.log(result);
  });

  // db.close();
});