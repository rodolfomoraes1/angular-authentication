const express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

const mongoose = require('mongoose');
const db = 'mongodb+srv://root:root@cluster0-0m5fr.mongodb.net/eventsdb?retryWrites=true';

const TOKEN_KEY = 'secretKey';
const REFRESH_TOKEN_KEY = 'refreshSecretKey';

mongoose.connect(db, {useNewUrlParser: true}, (err) => {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Connected to mongodb');
    }
});

router.get('/', (req, res) => {
    res.send('From API Route');
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unathorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null' || token === ''.trim() ) {
        return res.status(401).send('Unathorized request');
    }

    try {
        let payload = jwt.verify(token, TOKEN_KEY);

        if(!payload){
            return res.status(401).send('Unathorized request');
        }
        req.userId = payload.subject;
        next();
    } catch(err) {
        if(err.name === 'TokenExpiredError'){
            return res.status(401).send('Token is expired');
        } else {
            return res.status(401).send('Unathorized request');
        }
    }
}

function verifyRefreshToken(req, res, next) {
    if (!req.headers.refreshauthorization) {
        return res.status(401).send('Unathorized request');
    }
    let refreshToken = req.headers.refreshauthorization.split(' ')[1];
    if(refreshToken === 'null') {
        return res.status(401).send('Unathorized request');
    }

    let payload = jwt.verify(refreshToken, REFRESH_TOKEN_KEY);

    if(!payload){
        return res.status(401).send('Unathorized request');
    }
    req.userId = payload.subject;
    next();
}

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.error('Error! ' + err);
        } else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, TOKEN_KEY, {expiresIn: '1m'});
            let refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, {expiresIn: '1d'});
            res.status(200).send({token, refreshToken});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.error('Error! ' + error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password');
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, TOKEN_KEY, {expiresIn: '1m'});
                    let refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, {expiresIn: '1d'});
                    res.status(200).send({token, refreshToken});
                }
            }
        }
    })
});

router.get('/refreshToken', verifyRefreshToken, (req, res) => {
    let refreshToken = req.headers.refreshauthorization.split(' ')[1];
    let refreshPayload = jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
    if(!refreshPayload){
        return res.status(401).send('Unathorized request');
    }

    User.findOne({ _id: refreshPayload.subject }, (error, user) => {
        if (error) {
            console.error('Error! ' + error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email');
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, TOKEN_KEY, {expiresIn: '1m'});
                let refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, {expiresIn: '1d'});
                req.userId = payload.subject;
                res.status(200).send({token, refreshToken});
            }
        }
    })
});

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-02-15T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-02-16T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-02-17T18:25:43.511Z"
        }]

    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-02-15T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-02-16T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-02-17T18:25:43.511Z"
        }]

    res.json(specialEvents);
});

module.exports = router;