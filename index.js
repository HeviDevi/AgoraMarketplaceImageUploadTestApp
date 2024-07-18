// enviroment variables
require('dotenv').config();
// Dependencies
const express = require('express');
const { MongoClient } = require('mongodb');

// MongoDB connection variables
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;
const client = new MongoClient(MONGO_URI);
const dbName = process.env.MONGO_DB_NAME;
const mongooseConnection = require('./config/mongoose-conn');
//Image model
const Image = require('./models/Image-Url');
// Cloudinary Connection
const  cloudinary  = require('./config/cloudinary-conn')
// Multer 
const upload = require('./utils/multer');
//
const FileSystem = require('fs');


// App
const app = express();
app.set('view engine', 'ejs');
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));


// Add image post_details from post route to the database
// const saveImageToMongoDB = async (post_details) => {
//     try {
//         await Image.create(post_details);
//     } catch (error) {
//         console.error("Error saving image to MongoDB:", error);
//         throw new Error("Failed to save image to MongoDB");
//     }
// };





app.get('/api/upload', (req, res, next) => {
    res.render('index') 
})

app.post('/api/upload', upload.single('img'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }
        let multer = req.file;
        console.log("File processed by multer:", req.file);
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log("File uploaded to Cloudinary:", result);

        FileSystem.unlinkSync(req.file.path);

        const post_details = {
            title: req.body.title,
            image_public_id: result.public_id,
            image_url: result.secure_url
        };

        await Image.create(post_details);
        console.log("MongoDB Doc created:", post_details);
        res.status(200).json({ 
          message: 'Image uploaded, First response object is the Cloudinry response, Second object is the MongoDB document, Third object is the multer object',
          cloudinary: result,
          mongoDB: post_details,
          multer: req.file 
        });
        
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

app.get('/api/image', async (req, res) => {
    try {
      let title = req.query.title;
        const image = await Image.findOne({title: title});
        let chosenImage = image.image_url;
        res.render('imageDisplay', {chosenImage});
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
})

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });




// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })