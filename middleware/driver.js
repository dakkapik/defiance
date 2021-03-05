module.exports = function(req, res, next) {
    if (req.user.role === 'driver')
        return res.status(200).send('Welcome driver!');
    next();
};