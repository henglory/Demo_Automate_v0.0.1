import app from './app'

var server = app.listen(process.env.PORT, function(){
    var port = server.address().port
    console.log("Demo Automation Test has already started and listening at port -> ", port)
})