import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// const noteSchema = new Schema({
//   content: String
//   // createdAt: { type: Date, default: Date.now }
// });
const noteSchema = new Schema({
  content: String
}, { 
  timestamps: true // ← هذا السطر سيضيف createdAt و updatedAt تلقائيًا
});
noteSchema.set('charset','utf8');

export default mongoose.model('Note', noteSchema);
