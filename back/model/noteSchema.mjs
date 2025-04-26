import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: String
});
noteSchema.set('charset','utf8');

export default mongoose.model('Note', noteSchema);
