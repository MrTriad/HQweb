"use strict"
const express = require('express')
const router = express.Router();

const Review = require('../../models/review')

// Create Review
router.post('/addReview',  async (req, res) => {
    const review = new Review({
    user: req.body.user,
    content: req.body.content,
    rate: req.body.rate,
    posted_at: new Date(req.body.Date)
    })

    try {
    const newReview = await review.save()
    res.redirect(`reviews`)
    } catch {
    renderNewPage(res, review, true)
    }
})

// Delete Review
router.delete('/:id', async (req, res) => {
    if(req.session.user) {
        let review
        try {
            review = await Review.findById(req.params.id)
            await review.remove()
            res.redirect('/reviews')
        } catch {
            if (review != null) {
                res.render('reviews', {
                review: review,
                errorMessage: 'Could not remove review'
                })
            } else {
                res.redirect('/')
            }
        }
    }
})


module.exports = router