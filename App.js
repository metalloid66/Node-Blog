const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {dbURI} = require('./config');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogroutes')

// get the port number
let port = process.env.PORT || 8080

// express app
const app = express();

// connect to mongoDb
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true}).then((result)=> app.listen(port))
.catch((err)=>console.log(err))

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews'); change views folder


// Middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'));

// routes
app.get('/', (req,res) => {
res.redirect('/blogs');
})
app.get('/about', (req,res) => {
    // res.sendFile('./views/about.html', {root: __dirname})
    res.render('about',{title: 'About'});
})

// blog routes
// app.use('/blogs',blogRoutes) // with scoping out
app.use(blogRoutes); //without scoping out

// 404 page
app.use((req, res)=>{
    res.status(404).render('404',{title: '404'});
})
