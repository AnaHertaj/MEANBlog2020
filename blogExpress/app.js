const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const bodyParser = require('body-parser');
const multer = require('multer');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const apiRouter = require('./routes/api');
// cors allow usage of server from different origin only for development
const cors = require('cors');


//CONECTAR CON LA BASE DE DATOS
require('./db');

const app = express();


app.use(cors());
//app.use(cors({ origin: "*" }));
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


// MIDDLEWARE //
// app.use((req,res,next) => {
//     next();
// });

// app.listen(3000, () => {
//   console.log("The server started on port 3000 !!!!!!");
// });

/// MULTER AS RECEIVE POST FROM ANGULAR \\\ 

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
    callBack(null, new Date().toISOString() + file.originalname)
  }
})

const upload = multer({ storage: storage })

//let upload = multer({ dest: 'uploads/' })

// app.get("/", (req, res) => {
//   res.send(
//     `< h1 style = 'text-align: center' >
//             Wellcome to FunOfHeuristic 
//             <br><br>
//             <b style="font-size: 182px;">😃👻</b>
//         </h1>`
//   );
// });

app.post('/file', upload.single('url_imagen'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
})


/// MULTER AS RECEIVE POST FROM ANGULAR END \\\ 

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/api', apiRouter);
//////app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
