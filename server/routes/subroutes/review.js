"use strict"
const express = require('express')
const router = express.Router();
const User = require('../../models/user')
const Review = require('../../models/review')




///////////////////////////////////////////////////////////////////////////
///// API /////////////////////////////////////////////////////////////////

router.post("/addReview", async (req, res) => {

	const {
		user,
		host,
		content,
		rate,
		posted_at
	} = req.body
	try {
		var review = new Review(req.body)
		review.save()
		req.flash('success', 'Review created with success!');
		res.redirect('/reviews')

	} catch (error) {
		req.flash('error', 'System error, contact an admin');
		res.redirect('/reviews/addReview')
	}

});

///////////////////////////////////////////////////////////////////////////
///// Routes //////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {
	const reviews = await Review.find().sort({
		posted_at: -1
	})
	res.render("reviews/index", {
		reviews: reviews,
		session: req.user
	});
});

router.get("/addReview", async (req, res) => {
	const users = await User.find()
	res.render("reviews/addReview", {
		users: users,
		session: req.user
	});
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