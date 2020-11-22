const Category = require('../photo_models/category');

module.exports = (req, res, next) => {
    const id = req.params.categoryId;
    Category.findById(id)
        .exec()
        .then(doc => {
            if (doc.photoList.length < doc.limit ||
                (req.body.hasOwnProperty('propName') && req.body.propName !== 'photoList') ||
                    !req.body.hasOwnProperty('photoList')) {
                next();
            } else {
                res.status(403).json({
                    message: 'Forbidden: Category reached its limit'
                });
            }
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
};