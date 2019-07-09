import newman from 'newman'
import replace from 'buffer-replace'
import fs from 'fs'

function healthcheckTestsuiteRegister(router) {
    router.get('/api/healthcheck/testsuite', doHealthCheckTestsuite)
}

function healthcheckTestsuitHtmlRegister(router) {
    router.get('/api/healthcheck/testsuite/html', doHealthCheckTestsuiteHtml)
}

function doHealthCheckTestsuiteHtml(req, res) {
    console.log('start run healthcheck testsuite')
    if(fs.existsSync('temp.html')){
        fs.unlinkSync('temp.html')
    }
    newman.run({
        collection: require('../collections/Demo_Automate_v0.0.1.postman_collection.json'),
        environment: require('../environment/Demo_Automate_v0.0.1.postman_environment.json'),
        reporters: ['htmlextra'],
        reporter: { htmlextra : { export : 'temp.html', darkTheme : true } },
        insecure: true,
    }, function(err, summary){
        console.log('end run healthcheck testsuite')
        if (err) {
            res.status(400).json({success: false, error: 'collection run failed'});
        }else{
            fs.readFile('temp.html', function (err, html) {
                if(err) {
                    res.status(401).json({success: false, error: 'cannot load result in html'})  
                }else{
                    res.writeHeader(200, {"Content-Type": "text/html"})
                    html = replace(html, 'Newman', 'Demo_Automation')
                    res.write(html)
                    res.end() 
                }
            })
        }
    })
}

function doHealthCheckTestsuite(req, res) {
    console.log('start run healthcheck testsuite')
    newman.run({
        collection: require('../collections/Demo_Automate_v0.0.1.postman_collection.json'),
        environment: require('../environment/Demo_Automate_v0.0.1.postman_environment.json'),
        reporters: ['cli'],
        insecure: true,
    }, function(err, summary){
        console.log('end run healthcheck testsuite')
        
        if (err) {
            res.status(400).json({success: false, error: 'collection run failed'});
        }else{
            var testsuite_result = false
            if(summary.run.stats.assertions.failed == 0) {
                testsuite_result = true
            }
            if (testsuite_result) {
                res.status(200).json({
                    testsuite: testsuite_result,
                    stat: summary.run.stats,
                })
            }else{
                res.status(401).json({
                    testsuite: testsuite_result,
                    stat: summary.run.stats,
                })
            }
        }
    })
}   

export { healthcheckTestsuiteRegister, healthcheckTestsuitHtmlRegister }