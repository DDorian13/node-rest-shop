const Competition = require('../photo_models/competition');

module.exports = function(doc, req) {
    return (req.userData.userId == doc.creator._id || doc.VIP.length <= 0 || doc.VIP.includes(req.userData.userId));
};