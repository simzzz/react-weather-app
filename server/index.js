const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const userSchema = new mongoose.Schema({
    favoriteCities: [
        {
            id: Object
        }
    ],
    settings: {
        mode: String,
        unit: String
    }
});

const User = mongoose.model('User', userSchema);

mongoose
    .connect('mongodb://localhost:27017/userdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

// Initialize single user if not exists
mongoose.connection.once('open', async () => {
    let user = await User.findOne();
    if (!user) {
        user = new User({
            favoriteCities: [],
            settings: { mode: 'dark', unit: 'metric' }
        });
        await user.save();
    }
});

// Routes

// GET favorite cities
app.get('/favorites', async (req, res) => {
    const user = await User.findOne();
    res.send(user.favoriteCities);
});

// POST favorite cities
app.post('/favorites', async (req, res) => {
    const user = await User.findOne();
    user.favoriteCities = req.body;
    await user.save();
    res.send(user.favoriteCities);
});

// GET settings
app.get('/settings', async (req, res) => {
    const user = await User.findOne();
    res.send(user.settings);
});

// POST settings
app.post('/settings', async (req, res) => {
    const user = await User.findOne();
    user.settings = req.body;
    await user.save();
    res.send(user.settings);
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
