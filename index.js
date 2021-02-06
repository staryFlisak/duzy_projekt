const express = require('express');
const mongoose = require('mongoose');

const adminsRoutes = require('./routes/admins');
const sonRoutes = require('./routes/sons');
const parentRoutes = require('./routes/parents');
const chatMessages = require('./routes/chat-messages');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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