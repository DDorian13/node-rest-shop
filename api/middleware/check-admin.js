module.exports = (req, res, next) => {
    try {
        if (req.userData.permissions) {
            next();
        } else {
            return res.status(403).json({
                message: "Forbidden: no permission"
            })
        }
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};