const router = require("express").Router();

let TodoModel = require('../models/Todo.model')

/* GET home page */
router.get("/", (req, res, next) => {
  TodoModel.find()
    .then((reponse) => {
      res.render('index.hbs', {todos: reponse})
    })
    .catch((err) => {
      console.log('Some error in finding', err)
    })
});

// Handles GET requests to 'localhost:3000/add-form'
router.get('/add-form', (req, res, next) => {
  res.render('todos/add-form.hbs')
})

// Handles POST requests to 'localhost:3000/add-form'
router.post('/add-form', (req, res, next) => {
  console.log(req.body )
  TodoModel.create(req.body)
    .then(() => {
      res.redirect('/') // redirects to a URL
    })
    .catch((err) => {
      console.log('Some error in finding', err)
    })
})

// Shows the Todo detail page
router.get('/todo/:id', (req, res) => {
  let {id} = req.params
  // Find the todo from the DB with that specific ID
  TodoModel.findById(id)
      .then((todo) => {
        res.render('todos/todo.hbs', {todo})
      })
      .catch((err) => {
        console.log('Some error in finding', err)
      })
   
})

// Shows the EDIT from with the todo information
router.get('/todo/:id/edit', (req, res) => {
  let {id} = req.params
  // Find the todo from the DB with that specific ID
  TodoModel.findById(id)
      .then((todo) => {
        res.render('todos/edit.hbs', {todo})
      })
      .catch((err) => {
        console.log('Some error in finding', err)
      })
})

// Handles POST reqests while editing todos
router.post('/todo/:id/edit', (req, res) => {
  let {id} = req.params
  console.log(req.body)
  TodoModel.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.redirect(`/todo/${id}`) // redirects to todo detail URL
    })
    .catch((err) => {
      console.log('Some error in finding', err)
    })

})

router.post('/todo/:id/delete', (req, res) => {
  let {id} = req.params
  console.log(req.body)
  TodoModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect(`/`) // redirects to HOME PAGE
    })
    .catch((err) => {
      console.log('Some error in finding', err)
    })
})


module.exports = router;
