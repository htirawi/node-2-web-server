const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// middleware are excuted in the order you call app.use
// this middleware will stop every thing after it from excuting.
// app.use((req,res,next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

//middleware to help us keep track of how our server working
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable tp append server.js');
    }
  })
  next();
});

// if you want to use .html for views instead of hbs extenssion
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);
//dirname stores path to your project (node-web-server)

hbs.registerHelper('getCurrentYear' , () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screemIt', (text) => {
  return text.toUpperCase();
})

app.get('/' , (req,res) => {
  // res.send('<h1><i>Hello Tirawi King Of Expresssss!</i></h1>');
  // res.send({
  //   name: "Hussein",
  //   age: 30,
  //   likes: [
  //     'Biking',
  //     'Travel'
  //   ]
  // });

  res.render('home' , {
    pageTitle: 'Home Page',
    welcomeMessage: "Weolcome to our page ",
    name: 'hussein'
  });
});

app.get('/about', (req,res) => {
  res.render('about' , {
    pageTitle: 'Aboutt Page',
    name: "Hussein"
  });
});

app.get('/bad' , (req,res) => {

  res.send({
    errorMessage : '404 - Page Not Found'
  });

});

// object stores all env variables as key/value pairs
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
