const  express = require('express');
const redis = require('../redis');
const router = express.Router();


/*  GET added_todos  counter number */
router.get('/', async (req, res) => {
const addedTodos = await  redis.getAsync('added_todo');
console.log(addedTodos);
res.send({"added_todos": Number(addedTodos)} );
});


module.exports = router;
