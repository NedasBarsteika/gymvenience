// server.ts
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 5173;

// Configure storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/Images/Trainers');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `trainer-${uniqueSuffix}${ext}`);
  }
});

// File filter for image-only uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Upload endpoint
app.post('/api/trainers/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `/Images/Trainers/${req.file.filename}`;
  
  // Here you would typically save imageUrl to your database
  // Example: await Trainer.updateOne({ _id: trainerId }, { imageUrl });
  
  res.status(201).json({ imageUrl });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});