// External dependencies
const express = require('express')
const router = express.Router()

// Which team are you on?
router.post('/what-team-are-you', function(req, res) {
    let team = req.session.data['team']

    // If select a team, then proceed
    if (team == "a" || team == "b") {
        res.redirect("national-faithful-number")
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render("what-team-are-you", {
            errorMsg: true
        });
    }
})

// National faithful number
router.post('/national-faithful-number', function(req, res) {
    let number = req.session.data['nfs-number']

    // Number field empty, show error
    if (!number || number.trim() === "") {
        // Don't proceed, render page with error message - error message text set in the view
        return res.render("national-faithful-number", {
            errorMsg: true
        });
    } else {
        // If number is entered, then proceed to this page:
        res.redirect("animal-tangram-code")
    }
})

// Animal tangram combination code
router.post('/animal-tangram-code', function(req, res) {
    let code = req.session.data['code']

    // If select a team, then proceed
    if (code == "121" || code == "111" || code == "147" || code == "87") {
        res.redirect("word-scramble")
    } else {
        // Don't proceed and show error if nothing selected - error message text set in the view
        return res.render("animal-tangram-code", {
            errorMsg: true
        });
    }
})

module.exports = router
