const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },

},{timestamps:true});

module.exports = mongoose.model('Job', jobSchema);
