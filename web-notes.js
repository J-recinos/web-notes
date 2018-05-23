const morgan = require('morgan');
const notes = [
  'http is a protocol',
  'hi andrew is making me do this'
];
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(morgan('tiny'));
app.use('/css', express.static('css'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/notes', (req, res) => { 
  notes.push(req.body.note);
  res.redirect('/');
});
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('notes', {
    notes: notes
  });
});

app.delete('/notes/:id', (req, res) => {
  if (req.params.id < notes.length) {
    notes.splice(req.params.id, 1);
    res.send('deleted');
  } else {
    res.send("Error! That index value is out of bounds and the note does not exist.")
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.use('/js', express.static('js'));
/*
app.get('/', (req, res) => res.send('Web notes!'))*/
