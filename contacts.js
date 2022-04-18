const { urlencoded } = require('express');
const express = require('express');
const path = require('path');
const port = 9000;

const app = express();


var contactList = [
    {
        name : "Manish",
        phone : "123"
    },
    {
        name : "Kumar",
        phone : "456"
    },
    {
        name : "Gupta",
        phone : "789"
    }
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// app.use(function(req, res, next){
//     req.UID = "804023918706";

//     next();
// });

// app.use(function(req, res, next){
//     req.PAN = "CHHPG3087M";
//     req.body.phone = "8877";

//     next();
// });

app.get('/', function(req, res){
    // console.log(req);
    // console.log("From Middleware one : " , req.UID);
    // console.log("From Middleware two : ", req.PAN);
    res.render('contacts', {
        title : "Contact Lists App",
        contact_List : contactList
    });
});

app.get('/practise', function(req, res){
    res.render('practise', {
        title : "EJS Practise",
        condition : false
    });
});


app.get('/delete-contact/:phone', function(req, res){
    console.log(req.params);
    let phone = req.params.phone;

    // console.log(req.query);
    // let phone = req.query.phone;

    let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
});


app.post('/create-contact', function(req, res){
    // console.log(req);
    // return res.redirect('/practise');
    
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    //contactList.push(req.body);

    contactList.push({
        name : req.body.name,
        phone : req.body.phone
    });

    return res.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log('error');
        return;
    }
    else{
        console.log('Server Running at', port);
    }
});