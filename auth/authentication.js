/**
 * Created by joep on 13-06-17.
 */

var settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(username) {
    const playload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(playload, settings.secretkey);
}

function decodeToken(token, cb) {

    try {
        const payload = jwt.decode(token, settings.secretkey);

        // Check if the token has expired. To do: Trigger issue in db ..
        const now = moment().unix();

        // Check if the token has expired
        if (now > payload.exp) {
            console.log('Token has expired.');
        }

        // Return
        cb(null, payload);

    } catch (err) {
        cb(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};