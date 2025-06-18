const sanitizeHtml = require('sanitize-html');

function sanitize(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = sanitizeHtml(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitize(obj[key]);
        }
    }
}

module.exports = (req, res, next) => {
    if (req.body) sanitize(req.body);
    if (req.query) sanitize(req.query);
    if (req.params) sanitize(req.params);
    next();
};