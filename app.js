//elso soros komment
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

//---------------------------
const categoryRoutes = require('./api/photo_routes/categories');
const competitionRoutes = require('./api/photo_routes/competitions');
const photoRoutes = require('./api/photo_routes/photos');
const pUserRoutes = require('./api/photo_routes/users');
//---------------------------

mongoose.connect('mongodb+srv://user1:'+process.env.MONGO_ATLAS_PW+'@cluster0.mj4rz.mongodb.net/pp?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//---------------------------
app.use('/categories', categoryRoutes);
app.use('/competitions', competitionRoutes);
app.use('/photos', photoRoutes);
app.use('/puser', pUserRoutes)
//---------------------------

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
       error: {
           message: error.message
       }
    });
});

module.exports = app;