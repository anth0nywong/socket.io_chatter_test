import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import * as DBConfig from './db';
import bodyParser from 'body-parser';
// import the database adaptor package
import mongoose from 'mongoose';

// Step 1 for auth - import modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';

// modules for JWT support JASON WEB TOKEN (secure connection between back end and front end)
import cors from 'cors'; //Cross-Origin Resource Sharing, allow accept form 2 servers to the same box
import passportJWT from 'passport-jwt';

//define jwt Aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// Step 2 for auth - define our auth objects
let localStrategy = passportLocal.Strategy //alias

// Step 3 for auth - import the User Model
import User from '../models/user'

// import router data from the router modules(s)
import authRouter from '../routes/auth'
import vehicleRouter from '../routes/vehicle'
import rentalRouter from '../routes/rental'
import imageRouter from '../routes/image'



// Create the application object - which is of type express
let app = express();

mongoose.connect((process.env.RemoteURI)?process.env.RemoteURI :process.env.LocalURI||"mongodb://127.0.0.1/media");
const db = mongoose.connection; // alias for the mongoose connection

// Listen for Connection or Errors
db.on("open", function()
{
  console.log(`Connected to MongoDB at: ${(process.env.RemoteURI)?process.env.HostName:"localhost"}`);
});

db.on("error", function()
{
  console.log(`Connection Error`);
});

// Setting path to views folder
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser({limit: '50mb'}));
//Get Type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Setting path to client
app.use(express.static(path.join(__dirname, '../../client')));
// Setting static path to node modules folder
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors()); // adds CORS middleware

// Step 4 for auth -setup express session
app.use(session({
  secret: process.env.Secret as string,
  saveUninitialized : false,
  resave: false
}));

// Step 6 for auth - initialize 
app.use(passport.initialize());
app.use(passport.session());


// Step 7 for auth - implement the auth strategy
passport.use(User.createStrategy());

// Step 8 for auth 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup JWT options
let jwtOptions = 
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.Secret as string
}

// setup JWT strategy
let strategy = new JWTStrategy(jwtOptions, function(jwt_payload, done)
{
    User.findOne({id: jwt_payload.id}, (err,user)=>{
      if (err) {
        return done(err, false);
    }
    if (user) {
      console.log(typeof(user));
        return done(null, user);
    } else {
        return done(null, false);
    }})
});

passport.use(strategy);
// add Router
app.use('/api', authRouter);
app.use('/api', rentalRouter);
app.use('/api', vehicleRouter);
app.use('/api', imageRouter);
//app.use('/api', passport.authenticate('jwt', {session: false}), movieListRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err : createError.HttpError, req:express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

// //Connect to S3
// const s3 = new AWS.S3({
//   accessKeyId: DBConfig.AWS_S3_ACCESS_KEY_ID,
//   secretAccessKey: DBConfig.AWS_S3_SECRET_ACCESS_KEY,
// })

// const image = path.join(__dirname, '../../client/assets/images/image-search-1600-x-840-px-62c6dc4ff1eee-sej-760x400.png')

// const fileContent = fs.readFileSync(image, 'utf8');

// const params = {
//   Bucket: DBConfig.BUCKET_NAME as string,
//   Key: 'cat.jpg',
//   Body: fileContent
// };

// const x = s3.upload(params, function(err, data) {
//   console.log("Trying to connect");
//   if (err) console.log(err, err.stack);
//   else console.log('File upload successfully', data.Location);
// });

// console.log(x);
