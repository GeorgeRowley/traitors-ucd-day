// External dependencies
const express = require('express')
const router = express.Router()

// National faithful number
router.post('/national-faithful-number', function(req, res) {
    let number = req.session.data['nfs-number']

    // Number field empty, show error
    if (!number || number.trim() === "") {
        // Don't proceed, render page with error message - message set in the view
        return res.render("national-faithful-number", {
            errorSummary: true
        });
    } else if (number == "123"){
        // If number entered is 123 then proceed to this page:
        res.redirect("correct")
    } else {
        // If any other number is entered, then proceed to this page:
        res.redirect("incorrect")
    }
})

module.exports = router
