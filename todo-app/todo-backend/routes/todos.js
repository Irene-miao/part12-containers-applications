const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis  = require('../redis');



/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.json(todos);
});


let counter = 0;
/* POST todo to listing. */
router.post('/', async (req, res) => {
  
const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.json(todo);
 counter++; 
  redis.setAsync('added_todo', counter );  
});





const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await req.todo
  res.json(todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text
req.todo.done =  req.body.done
const updateTodo = await req.todo.save()
 res.json(updateTodo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;
