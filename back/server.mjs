import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import Note from './model/noteSchema.mjs';
const ObjectId = mongoose.Types.ObjectId;

const app = express();
const port = process.env.PORT || 3000;
// Enable cors at the server side. 
import cors from 'cors';
app.use(express.json());
0
// Enable cors at the server side. 
 const corsOption = { origin: 'http://localhost:3001',
  credentials: true, methods: ["GET", "POST", "PUT", "DELETE"], } 
 app.use(cors(corsOption));
 app.use(cors(corsOption));

// const mongoURI = "mongodb+srv://user1:DbYxM0iQZNVD9mdZ@notebook.pmacxk5.mongodb.net/";
// const mongoURI = "mongodb+srv://admin:admin@notebook.pmacxk5.mongodb.net/";
const mongoURI = "mongodb+srv://admin:LlsalvlT0FDhvhdw@notebook.pmacxk5.mongodb.net/";
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log(chalk.yellow('Connected to the database')))
//   .catch(err => console.error(chalk.red('An error occurred while connecting to the database.'), err));
  mongoose.connect(mongoURI)
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// استخدام body-parser لمعالجة البيانات
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // يمكنك تحديد المصدر الخاص بك هنا بدلاً من '*'
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// إضافة مفكرة جديدة
// app.post('/notesAdd', (req, res) => {
//   const newNote = req.body.note; // افترض أن البيانات الجديدة تأتي في req.body.note

//   if (newNote) {
//     Note.collection.insertOne({ content: newNote })
//       .then(addedNote => {
//         console.log(addedNote);
//         res.status(201).json(addedNote.ops[0]); // ops[0] للحصول على البيانات المضافة
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   } else {
//     res.status(400).json({ error: 'Invalid data for note' });
//   }
// });
app.post('/notesAdd', async (req, res) => {
  const newNote = req.body.note;

  if (newNote) {
    try {
      const result = await Note.create({ content: newNote });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while adding the note' });
    }
  } else {
    res.status(400).json({ error: 'Invalid data for note' });
  }
});


// app.put('/notesUpdate/:id', (req, res) => {
//   Note.collection.deleteOne({ _id: new ObjectId(req.params.id) })
//     .then(removedNote => {
//       console.log(removedNote);
//       res.status(200).json(removedNote)

//     })
//     .catch(err => {
//       res.status(500).json({error: 'coud not delete the note'})
//     });

//     const newNote = req.body.note;
//     if (newNote) {
//       Note.collection.insertOne({ content: newNote } , {id: req.params.id})
//         .then(addedNote => {
//           console.log(addedNote);
//           res.status(201).json(addedNote.ops[0]); // ops[0] للحصول على البيانات المضافة
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     } 

// });
app.put('/notesUpdate/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Not a valid note id' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { content: req.body.note },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update the note' });
  }
});



// حذف مفكرة بناءً على معرفها
// app.delete('/notesDelete/:id', (req, res) => {
//   if (ObjectId.isValid(req.params.id)){
//   // const note = req.body.note;
//     // console.log( req.params.id );
//     Note.collection.deleteOne({ _id: new ObjectId(req.params.id) })
//     .then(removedNote => {
//       console.log(removedNote);
//       res.status(200).json(removedNote)

//     })
//     .catch(err => {
//       res.status(500).json({error: 'coud not delete the note'})
//     });
//   }else{
//     res.status(500).json({error: 'not a valid note id'})
//   }
// });
app.delete('/notesDelete/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Not a valid note id' });
    }

    const result = await Note.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete the note' });
  }
});


app.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    // console.log(notes);
    const contentArray = notes.map((note) => note.content);
    // console.log(contentArray);
    // res.json/(contentArray);
    res.json(notes);
    // console.log(notes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching notes.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
