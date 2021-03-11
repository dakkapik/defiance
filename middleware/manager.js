module.exports = function(req, res, next) {
    if (req.user.role === 'manager')
        return res.status(200).send('Welcome manager!');
    next();
};