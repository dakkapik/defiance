module.exports = function(req, res, next) {
    if (req.user.role === 'spectator')
        return res.status(200).send('Welcome spectator!');
    next();
};