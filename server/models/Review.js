const mongoose =require('mongoose');


const reviewSchema =new mongoose.Schema({
    article_id: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true,
        minlength: 2
    },
    rating: {
        type: Number,
        default: 0
    }
});


const Review =mongoose.model('reviews', reviewSchema);


module.exports ={
    Review: Review
};