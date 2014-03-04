var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {type: String, required: true}
});

var ImageSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String},
    tags: {type: [TagSchema]}
});

module.exports = mongoose.model('Image', ImageSchema);
