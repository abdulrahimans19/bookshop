const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://books:books@cluster0.cpqnnqy.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('database connected')
    })
    .catch(() => {
        console.log('error connecting database')
    })

module.exports = mongoose