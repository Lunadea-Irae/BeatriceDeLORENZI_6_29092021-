const express = require('express');
const helmet = require("helmet");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');


app.use(helmet());
app.use(express.json());
mongoose.connect('mongodb+srv://admin:openclassrooms@piicante.gyqcq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;