const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const adminsRoutes = require('./routes/admins');
const sonRoutes = require('./routes/sons');
const parentRoutes = require('./routes/parents');
const chatMessages = require('./routes/chat-messages');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');

const MongoDBStore = require("connect-mongo");

const dbUrl = 'mongodb://localhost:27017/wielki-projekt';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize({
    replaceWith: '_'
}))

const secret = 'thisshouldbeabettersecret!';

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    ttl: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/admins', adminsRoutes);
app.use('/sons', sonRoutes);
app.use('/parents', parentRoutes);
app.use('/messages', chatMessages);


app.get('/', (reg, res) => {
    res.send('Siema');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.listen(3000, () => {
    console.log('Serving on port 3000');
})