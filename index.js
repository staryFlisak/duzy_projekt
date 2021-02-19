const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const adminsRoutes = require('./routes/admins');
const sonRoutes = require('./routes/sons');
const parentRoutes = require('./routes/parents');
const chatMessages = require('./routes/chat-messages');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/wielki-projekt', {
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
app.use(methodOverride('_method'));

app.use('/', userRoutes);
app.use('/admin', adminsRoutes);
app.use('/son', sonRoutes);
app.use('/parent', parentRoutes);
app.use('/message', chatMessages);


app.get('/', (reg, res) => {
    res.send('Siema');
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
})