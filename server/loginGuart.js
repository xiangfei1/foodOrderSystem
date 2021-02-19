module.exports = function(req,res,next) {
    console.log('userInfo: ',req.app.locals.userInfo)
    next()
}