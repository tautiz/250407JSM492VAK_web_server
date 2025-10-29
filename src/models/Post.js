const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: 'string', required: true},
    content: String,
    slug: {type: 'string', required: true, unique: true},
    excerpt: String,
    readTime: Number,
    date: String,
    comments: [
        {
            owner: String,
            text: String,
            date: String
        }
    ]
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;
