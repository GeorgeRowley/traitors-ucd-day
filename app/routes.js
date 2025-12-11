// External dependencies
const express = require('express');
const router = express.Router();


//
// CHEAT PREVENTION
//
router.use(function(req, res, next){

    console.log( req.originalUrl );

    if( req.session.data.failedTask === 'true' && req.originalUrl !== '/fail' ){
        res.render('cheat');
    } else {
        next();
    } 

});


//
// WHAT TEAM ARE YOU ON?
//
router.post('/what-team-are-you', function(req, res) {
    let team = req.body.team;

    // If select a team, then proceed
    if (team == "1" || team == "2") {

        if( req.session.data.cya === 'true' ){
            delete req.session.data.cya;
            res.redirect('check-your-answers');
        } else {
            res.redirect('national-faithful-number');
        }

    } else {

        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render('what-team-are-you', {
            errorMsg: true
        });
    }

});



//
// NATIONAL FAITHFUL NUMBER
//
router.post('/national-faithful-number', function(req, res) {
    let number = req.session.data['number']

    // Number field empty, show error
    if (!number || number.trim() === '') {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render('national-faithful-number', {
            errorMsg: true
        });
    } else {

        // If number is entered, then proceed to this page:
         if( req.session.data.cya === 'true' ){
            delete req.session.data.cya;
            res.redirect('check-your-answers');
        } else {
            res.redirect('days-faithful');
        }
    }
})



//
// HOW MANY DAYS HAVE YOU BEEN A FAITHFUL?
//
router.post('/days-faithful', function(req, res) {
     let days = req.body.daysFaithful;

    // If select a team, then proceed
    if (days === "121" || days === "111" || days === "147" || days === "87") {
         if( req.session.data.cya === 'true' ){
            delete req.session.data.cya;
            res.redirect('check-your-answers');
        } else {
            res.redirect("maze-scramble");
        }
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render('days-faithful', {
            errorMsg: true
        });
    }
});

//
// MAZE SCRAMBLE
//
router.post('/maze-scramble', function(req, res) {

    let wordOne = req.session.data.wordOne || '';
    let wordTwo = req.session.data.wordTwo || '';

    req.session.data.wordOne = wordOne.toUpperCase().trim();
    req.session.data.wordTwo = wordTwo.toUpperCase().trim();

    // If any fields are empty, show error
    if ( wordOne.trim() === '' || wordTwo.trim() === '' ) {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render('maze-scramble', {
            errorMsg: true
        });
    } else {
        // If number is entered, then proceed to this page:
        res.redirect('check-your-answers');
    }
});



// Check your answers
router.post('/check-your-answers', function(req, res) {


    let team = req.session.data.team;
    let number = req.session.data.number;
    let days = req.session.data.daysFaithful;
    let wordOne = req.session.data.wordOne;
    let wordTwo = req.session.data.wordTwo;

    let words = [ wordOne.toUpperCase().trim(), wordTwo.toUpperCase().trim() ];


    if (
        // Team 1 - 925461738, 111 and REACT, SPIRE as asnwers is success
        team == "1" && 
        number == "925461738" && 
        days == "147" && 
        words.indexOf('REACT') > -1 &&
        words.indexOf('SPIRE') > -1
        
    ) {
        res.redirect("success");
    } else if (
        // Team 2 - 925461738, 147 and PLANE, LASER as asnwers is success
        team == "2" && 
        number == "925461738" && 
        days == "111" && 
        words.indexOf('PLANE') > -1 &&
        words.indexOf('LASER') > -1
    ) {
        res.redirect("success");
        
    } else {
        // If any other answers, they fail
        req.session.data.failedTask = 'true';
        res.redirect("fail");
    }
})

module.exports = router;
