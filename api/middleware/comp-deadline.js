const Competition = require('../photo_models/competition');

module.exports = (req, res, next) => {
    const id = req.params.competitionId;
    Competition.findById(id)
        .exec()
        .then(doc => {
            if (doc.deadline > Date.now()) {
                next();
            } else {
                res.status(403).json({
                    message: 'Forbidden: Competition has ended'
                });
            }
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
};