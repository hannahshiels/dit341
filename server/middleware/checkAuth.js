module.exports = (req,res, next) => {
    console.log(req.isAuthenticated());
    if(!req.isAuthenticated()){
        res.status(401).json({"message": "You are not logged in"})
    } else {
        return next()
    }
}