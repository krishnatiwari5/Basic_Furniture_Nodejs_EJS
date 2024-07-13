const fs = require('fs');
const path = require('path');

const express = require('express');
const exp = require('constants');
const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

const app = express();

app.set('views', path.join(__dirname, 'htmlejs'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/review', function(req, res) {
    const feedback = req.body;
    const a = console.log(req.body.item);
    const filePath = path.join(__dirname, 'reviews.json');
    const fileData = fs.readFileSync(filePath);
    const storeReviews = JSON.parse(fileData);
    // storeReviews.push(feedback);

    // fs.writeFileSync(filePath, JSON.stringify(storeReviews));
    res.render('review', { numberOfReviews : storeReviews.length,  reviews : storeReviews})
})




app.get('/feedback', function(req, res){
    res.render('feedback');
})

app.post('/feedback', function(req, res) {

    const feedback = req.body;
    const filePath = path.join(__dirname, 'reviews.json');
    const fileData = fs.readFileSync(filePath);
    const storeReviews = JSON.parse(fileData);
    storeReviews.push(feedback);

    fs.writeFileSync(filePath, JSON.stringify(storeReviews));

    res.redirect('/confirm');

    
})
app.get('/confirm', function(req, res){
    res.render('confirm')
})

app.listen(3000);