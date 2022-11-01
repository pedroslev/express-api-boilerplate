//----------------------------MODULOS----------------------------
import express from 'express'
import session from 'express-session';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import dotenv from 'dotenv'

dotenv.config()

//parser
import bodyParser from 'body-parser';

//express to run server
const app = express();
app.use(
  cors({
    origin: `${process.env.FRONT_URL}`, // <-- location of the react app were connecting to
    credentials: true,
  })
);

//----------------------------Middlewares----------------------------
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: false
    }))
app.use(cookieParser("secret"))
app.use(passport.initialize());
app.use(passport.session())

//----------------------------Database Tables----------------------------
import {Users} from './persistance.js'

//----------------------------Functional modules----------------------------
//import {} from './controllers.js'

//----------------------------ROUTES----------------------------
//import route creation
//import {} from './routes.js'
app.use('/api/status', appStatus)

//----------------------------Passport-local----------------------------
passport.use(
  new LocalStrategy((email, password, done) => {
    Users.findOne({ email: email }, async (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        if(password !== user.password){
          return done(null, false);
        }else{return done(null, user);}
      });
    })
  );

  passport.serializeUser((user, cb) => {
      cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
      Users.findOne({ _id: id }, (err, user) => {
        const userInformation = {
          email: user.email,
          name: user.name,
        };
        cb(err, userInformation);
      });
    });

//----------------------------EXPORTS----------------------------
export{
  passport,
  app
}

//----------------------------SERVER----------------------------
const Server = app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`)
})
Server.on('error', error => console.error(`Error while bringing up the server: `, error))