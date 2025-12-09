// External dependencies
const express = require('express')
const router = express.Router()

// Which team are you on?
router.post('/what-team-are-you', function(req, res) {
    let team = req.body.team;

    // If select a team, then proceed
    if (team == "1" || team == "2") {
        res.redirect("national-faithful-number")
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render("what-team-are-you", {
            errorMsg: true
        });
    }
})

// Change - Which team are you on?
router.post('/change-what-team-are-you', function(req, res) {
    let team = req.body.team;

    // If select a team, then proceed
    if (team == "1" || team == "2") {
        res.redirect("check-your-answers")
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render("change-what-team-are-you", {
            errorMsg: true
        });
    }
})

// National faithful number
router.post('/national-faithful-number', function(req, res) {
    let number = req.session.data['number']

    // Number field empty, show error
    if (!number || number.trim() === "") {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render("national-faithful-number", {
            errorMsg: true
        });
    } else {
        // If number is entered, then proceed to this page:
        res.redirect("days-faithful")
    }
})

// Change - National faithful number
router.post('/change-national-faithful-number', function(req, res) {
    let number = req.session.data['number']

    // Number field empty, show error
    if (!number || number.trim() === "") {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render("change-national-faithful-number", {
            errorMsg: true
        });
    } else {
        // If number is entered, then proceed to this page:
        res.redirect("check-your-answers")
    }
})

// How many days have you been a faithful?
router.post('/days-faithful', function(req, res) {
     let days = req.body.days;

    // If select a team, then proceed
    if (days == "121" || days == "111" || days == "147" || days == "87") {
        res.redirect("word-scramble")
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render("days-faithful", {
            errorMsg: true
        });
    }
})

// Change - How many days have you been a faithful?
router.post('/change-days-faithful', function(req, res) {
     let days = req.body.days;

    // If select a team, then proceed
    if (days == "121" || days == "111" || days == "147" || days == "87") {
        res.redirect("check-your-answers")
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render("change-days-faithful", {
            errorMsg: true
        });
    }
})

// Word scramble
router.post('/word-scramble', function(req, res) {
    let one = req.session.data['one']
    let two = req.session.data['two']
    let three = req.session.data['three']
    let four = req.session.data['four']
    let five = req.session.data['five']
    let six = req.session.data['six']
    let seven = req.session.data['seven']
    let eight = req.session.data['eight']

    // If any fields are empty, show error
    if (
        !one || one.trim() === "" ||
        !two || two.trim() === "" ||
        !three || three.trim() === "" ||
        !four || four.trim() === "" ||
        !five || five.trim() === "" ||
        !six || six.trim() === "" ||
        !seven || seven.trim() === "" ||
        !eight || eight.trim() === ""
    ) {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render("word-scramble", {
            errorMsg: true
        });
    } else {
        // If number is entered, then proceed to this page:
        res.redirect("check-your-answers")
    }
})

// Change - Word scramble
router.post('/change-word-scramble', function(req, res) {
    let one = req.session.data['one']
    let two = req.session.data['two']
    let three = req.session.data['three']
    let four = req.session.data['four']
    let five = req.session.data['five']
    let six = req.session.data['six']
    let seven = req.session.data['seven']
    let eight = req.session.data['eight']

    // If any fields are empty, show error
    if (
        !one || one.trim() === "" ||
        !two || two.trim() === "" ||
        !three || three.trim() === "" ||
        !four || four.trim() === "" ||
        !five || five.trim() === "" ||
        !six || six.trim() === "" ||
        !seven || seven.trim() === "" ||
        !eight || eight.trim() === ""
    ) {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render("change-word-scramble", {
            errorMsg: true
        });
    } else {
        // If number is entered, then proceed to this page:
        res.redirect("check-your-answers")
    }
})

// Check your answers
router.post('/check-your-answers', function(req, res) {
    let team = req.session.data['team']
    let number = req.session.data['number']
    let days = req.session.data['days']

    let one = req.session.data['one']
    let two = req.session.data['two']
    let three = req.session.data['three']
    let four = req.session.data['four']
    let five = req.session.data['five']
    let six = req.session.data['six']
    let seven = req.session.data['seven']
    let eight = req.session.data['eight']

    if (
        // Team A - 925461738, 111 and abruptly as asnwers is success
        team == "A" && 
        number == "925461738" && 
        days == "111" && 
        one == "a" && 
        two == "b" &&
        three == "r" &&
        four == "u" &&
        five == "p" &&
        six == "t" &&
        seven == "l" &&
        eight == "y"
    ) {
        res.redirect("success")
    } else if (
        // Team B - 925461738, 147 and abruptly as asnwers is success
        team == "B" && 
        number == "925461738" && 
        days == "147" && 
        one == "a" && 
        two == "b" &&
        three == "r" &&
        four == "u" &&
        five == "p" &&
        six == "t" &&
        seven == "l" &&
        eight == "y"
    ) {
        res.redirect("success")
    } else {
        // If any other answers, they fail
        res.redirect("fail")
    }
})

module.exports = router
