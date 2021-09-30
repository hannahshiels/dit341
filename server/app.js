const express = require('express');
const passport = require('passport');
require('./config/passport')();
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const usersRouter = require('./routes/users.routes');
const gardensRouter = require('./routes/gardens.routes');
const plantsRouter = require('./routes/plants.routes');
const tipsRouter = require('./routes/tips.routes');
const adsRouter = require('./routes/ads.routes');
const commentsRouter = require('./routes/comments.routes');
const authRouter = require('./routes/auth.routes');


const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
const app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
//app.options('*', cors());
app.use(cors({
    origin: [
        'http://localhost:8080'
    ],
    credentials: true}));

// use passport
app.use(cookies())
app.use(require('express-session')({ secret: 'get-potted', resave: false, saveUninitialized: false, cookie: { maxAge: 600000} }));
app.use(passport.initialize());
app.use(passport.session());
// Import routes
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to your DIT341 backend ExpressJS project!'});
});


app.use(usersRouter);
app.use(gardensRouter);
app.use(plantsRouter);
app.use(tipsRouter);
app.use(adsRouter);
app.use(commentsRouter);
app.use(authRouter);


// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
const root = path.normalize(__dirname + '/..');
const client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
