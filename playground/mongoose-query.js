const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '5956163f404f73880af50b5b';

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found!');
  }
  console.log(user);
}).catch((err) => {
  console.log('ID not valid');
});