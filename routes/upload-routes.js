// const router = require('express').Router();
// const Image = require('../models/Image-Url');
// const cloudinary = require('../config/cloudinary-conn');
// const upload = require('../utils/multer');


// router.get('/api/upload', (req, res, next) => {
//     res.render('index') 
// });

// router.post('/', upload.single('img'), async (req, res) => {
//     try {
//         if (!req.file) {
//             throw new Error('No file uploaded.');
//         }

//         const result = await cloudinary.uploader.upload(req.file.path);
//         console.log("Result:", result);

//         const post_details = {
//             title: req.body.title,
//             image_public_id: result.public_id,
//             image_url: result.secure_url
//         };

//         await Image.create(post_details);
//         res.status(200).json({ message: 'Image uploaded successfully', data: post_details });
//     } catch (error) {
//         console.error("Upload error:", error);
//         res.status(500).json({ error: 'Failed to upload image' });
//     }
// });

// module.exports = router;