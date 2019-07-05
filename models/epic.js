const mongoose = require('mongoose');

const epicSchema = new mongoose.Schema({
  file: String,
  date: String
});

epicSchema.statics.mostRecent = async () => {
  return this.find()
    .sort('date')
    .limit(5)
    .exec();
};

module.exports = mongoose.model('Epic', epicSchema);
