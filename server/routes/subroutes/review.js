"use strict"
const express = require('express')
const router = express.Router();

const Review = require('../../models/review')




///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/addReview", async (req, res) => {
	
	const { user, content, rate, posted_at } = req.body
    try {
        const response = await Review.create({
            user,
            content,
            rate,
            posted_at
        })
        req.flash('success', 'Review created with success!');
        console.log('CREATED')
        res.redirect('/addReview')
    } catch (error) {
        req.flash('error', 'System error, contact an admin');
        res.redirect('/addReview')
    }
	
});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
    const reviews = await Review.find().sort({ posted_at: 1 })
    res.render("reviews/index", {
        reviews: reviews
    });
});

router.get("/addReview", (req, res) => {
	res.render("reviews/addReview");
});

module.exports = router













// // All Review
// router.get('/', async (req, res) => {
//     let query = Review.find()
//     try {
//       const reviews = await query.exec()
//       res.render('reviews/index',  {
//         reviews: reviews
//       })
//     } catch {
//       res.redirect('/')
//     }
//   })

// // new Review
// router.get('/addReview', async (req, res) => {
//    // if(!req.session.user) {
//       renderNewPage(res, new Review())
// //   } else {
// //       res.sendStatus(403);
// //   }
//   })

// // Create Review
// router.post('review',  async (req, res) => {
//     if(!req.session.user) {
//         const review = new Review({
//         user: req.body.user,
//         content: req.body.content,
//         rate: req.body.rate,
//         posted_at: new Date(req.body.Date)
//         })

//         try {
//         const newReview = await review.save()
//         res.redirect(`reviews`)
//         } catch {
//         renderNewPage(res, review, true)
//         }
//     }
// })

// // Delete Review
// router.delete('/:id', async (req, res) => {
//     if(req.session.user) {
//         let review
//         try {
//             review = await Review.findById(req.params.id)
//             await review.remove()
//             res.redirect('/reviews')
//         } catch {
//             if (review != null) {
//                 res.render('reviews', {
//                 review: review,
//                 errorMessage: 'Could not remove review'
//                 })
//             } else {
//                 res.redirect('/')
//             }
//         }
//     }
// })

// async function renderNewPage(res, review, hasError = false) {
//     renderFormPage(res, review, 'addReview', hasError)
//   }


// module.exports = router