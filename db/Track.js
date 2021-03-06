const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
    content: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    _postedAt: {
        type: Number,
        immutable: true,
        default: Date.now
    },
    _updatedAt: { // Allow updates? TBD
        type: Number,
        immutable: true
    },
    taggedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: [{
        type: String,
        trim: true,
        match: /^[a-z0-9-_]+$/i
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: {
            allowOnNew: true
        }
    },
    repostedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});
trackSchema.pre('save', function () {
    if (this.isNew) {
        this._updatedAt = undefined;
    } else if (this.isModified()) {
        this._updatedAt = Date.now();
    }

    if (this.isModified('content')) {
        this.content = this.content.replace(/(\s(?=\s))+/g, ''); // Remove extra white space
    }
})

module.exports = mongoose.model('Track', trackSchema);
