require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Todo not found!');
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send('Todo not found!');
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send(err);
  })
});

app.delete('/todos/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send('Invalid ID');
  }
  Todo.findByIdAndRemove(req.params.id).then((todo) => {
    if (!todo) {
      return res.status(404).send('No todo with provided ID');
    }
    res.status(200).send({todo});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Invalid ID');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send('ID not found');
    }
    res.status(200).send({todo});
  }).catch((err) => res.status(400).send(err));

});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(401).send();
  });
});

app.listen(port, () => {
  console.log(`Server now listening on port ${port}`);
});

module.exports = {app};