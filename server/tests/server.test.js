const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should write new Todo in database', (done) => {
    var text = "Some todo";

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((res) => {
          expect(res.length).toBe(1);
          expect(res[0].text).toBe(text);
          done()
        }).catch((e) => done(e));
      })

  });

  it('should fail to make Todo with invalid request data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({}).then((docs) => {
          expect(docs.length).toBe(0);
          done();
        }).catch((err) => done(err));
      })
  });
});