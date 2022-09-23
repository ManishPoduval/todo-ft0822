// Connect to your DB
require('../db')
const mongoose = require('mongoose')

// Add data
let TodoModel = require('../models/Todo.model')
TodoModel.create([
    {title: 'Gym', description: 'Legs day', completed: false},
    {title: 'Groceries', description: 'Get vegetables', completed: false}
])
    .then(() => {
        console.log('Data added')
        mongoose.connection.close();
    })
    .catch(() => {
        console.log('Error while adding data')
    })

