
const router = require('express').Router();
const multer = require('multer');
//const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const Post = require('../../models/post');

const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads/');
    },
    filename: function (req, file, callBack) {
        callBack(null, new Date().toISOString() + '-' + file.originalname);
        //others ways :::: 
        //cb(null, `myBlog_${file.originalname}`)
        //cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// GET http://localhost:3000/api/posts
router.get('/', (req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.json({ error: err.message }));
});

// GET http://localhost:3000/api/posts/IDPOST
router.get('/:postId', (req, res) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            // res.json({ success: 'El post se está mostrando' });
            if (post) {
                res.json(post)({ success: 'El post se está mostrando' });
            } else {
                res.json({ error: 'El post no existe' });
            }
        })
        .catch(err => {
            res.json({ error: err.message });
        })
});

// POST http://localhost:3000/api/posts 
router.post('/', upload.single('url_imagen'), async (req, res, next) => {

    try {

        if (req.file) {
            url_imagen = req.file.path;
            req.body.url_imagen = url_imagen;
        } else {
            // req.body.url_imagen = url_imagen;
            req.body.url_imagen = '';
        }

        const newPost = await Post.create(req.body);
        res.json(newPost);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// PUT http://localhost:3000/api/posts
router.put('/', async (req, res) => {
    const editedPost = await Post.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.json(editedPost);

});

//DELETE http://localhost:3000/api/posts/IDPOST
router.delete('/:postId', (req, res) => {
    const postId = req.params.postId;
    Post.findByIdAndDelete(postId)
        .then(post => {
            // res.json({ success: 'El post se ha borrado' });
            if (post) {
                res.json({ success: 'El post se ha borrado' });
            } else {
                res.json({ error: 'El post no existe' });
            }
        })
        .catch(err => {
            res.json({ error: err.message });
        })
});

module.exports = router;

