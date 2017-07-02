const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');

// Todo.remove

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findByIdAndRemove

// Todo.findByIdAndRemove('5958a744fc18eb5401fb5bda').then((todo) => {
//   console.log(todo);
// });

// Todo.findOneAndRemove

// Todo.findOneAndRemove({
//   text: 'First test todo'
// }).then((todo) => {
//   console.log(todo);
// });