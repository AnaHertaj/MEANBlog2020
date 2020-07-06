
const router = require('express').Router();
const Post = require('../models/post');

const bodyParser = require('body-parser');
const multer = require('multer');

//cb= callBack
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
        callBack(null, './uploads/');
    },
    filename: function (req, file, callBack) {
        callBack(null, new Date().toISOString() + file.originalname);
        //others ways :::: 
        //cb(null, `myBlog_${file.originalname}`)
        //cb(null, file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }

// };

// const upload = multer({ dest: './uploads/' });

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

const upload = multer({ storage: storage });


// peticiones GET \\

//GET http://localhost:3000/posts
// res.send("Entro a /posts");
router.get('/', async (req, res) => {
    const posts = await Post.find();
    // console.log(posts);
    res.render('posts/index', { posts })
});


// GET http://localhost:3000/posts/nuevo
router.get('/nuevo', (req, res) => {
    // res.send("Entro a /posts/nuevo");
    res.render('posts/form')
});


// GET http://localhost:3000/posts/editar/IDPOST // 
router.get('/editar/:postId', async (req, res) => {
    //res.send("Entro a la ruta de EDIT");
    const postId = req.params.postId;
    Post.findById(postId)
        .then((post) => {
            res.render('posts/formEdit', { post });
        })
        .catch((err) => {
            res.send('Error al recuperar el post');
        });
});

//GET http://localhost:3000/posts/borrar/IDPOST
router.get('/borrar/:postId', (req, res) => {
    // res.send("Entro en la ruta /posts/borrar/IDPOST");
    const postId = req.params.postId;
    Post.findByIdAndRemove(postId)
        .then(post => {
            res.redirect('/posts');
        })
        .catch((err) => {
            res.send("<div style='color:red'>" + 'Error al borrar el posts ' + "</div>" + err.message);
        })
});


// peticiones POSTS \\

// POST sobre http://localhost:3000/posts/crear
router.post('/crear', upload.single('url_imagen'), async (req, res, next) => {
    // const file = req.file.url_imagen;
    // console.log(req);
    if (req.file) {
        url_imagen = req.file.path;
        req.body.url_imagen = url_imagen;
    } else {
        // req.body.url_imagen = url_imagen;
        req.body.url_imagen = '';
    }
    await Post.create(req.body);
    res.redirect('/posts');
});

//POST sobre http://localhost:3000/posts/actualizar
router.post('/actualizar', upload.single('url_imagen'), async (req, res, next) => {
    try {
        if (req.file) {
            url_imagen = req.file.path;
            req.body.url_imagen = url_imagen;
        }
        else if (req.file) {
            url_imagen = '';
            req.body.url_imagen = '';
        }
        else {
            req.body.url_imagen = url_imagen;
            //req.body.url_imagen = '';
        }
        await Post.findByIdAndUpdate(req.body.id, req.body);
        res.redirect('/posts');
    } catch (err) {
        res.send('Error en la actualización del post');
    }
});

module.exports = router;


// // const arrPosts = [
// //     { titulo: "Carpenter", contenido: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.', categoria: 'medioambiente', imagen: 'https://via.placeholder.com/150/FFFF00' },
// //     { titulo: "La era digital", contenido: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', categoria: 'tecnología', imagen: 'https://via.placeholder.com/150/FFFF00' },
// //     { titulo: "Aprender nunca está de más", contenido: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', categoria: 'educación', imagen: 'https://via.placeholder.com/150/FFFF00' }
// //   ]
