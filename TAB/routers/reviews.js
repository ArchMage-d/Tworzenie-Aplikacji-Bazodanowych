const {Router} = require("express");
const {ReviewsRecord} = require("../records/reviews.record");

const reviewsRouter = Router();

reviewsRouter
    .get('/', async (req, res) => {

        const reviewsList = await  ReviewsRecord.listAll();

        res.render('reviews/review', {
            reviewsList,
        });
    })
module.exports = {
    reviewsRouter,
}