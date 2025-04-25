import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  content: String
  // createdAt: { type: Date, default: Date.now }
});
noteSchema.set('charset','utf8');
// const newNote = new Note({ content: 'محتوى الملاحظة' });
// newNote.save(); 

// newNote.content = 'تحديث المحتوى';
// newNote.save();
export default mongoose.model('Note', noteSchema);
