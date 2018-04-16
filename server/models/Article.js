const mongoose =require('mongoose');


const articleSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        max: 500
    },
    author_id: {
        type: String,
        required: true
    },
    review_id: {
        type: String,
        required: true
    }
});


const Article =mongoose.model('articles', articleSchema);


module.exports ={
    Article: Article
};