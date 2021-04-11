exports.verfiySession = function (req, res, next) {
    if (req.user) {
        next();
    }
    else {
        return res.status(401).json({ error: "Unauthorised!!" });
    }
}