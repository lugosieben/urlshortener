const express = require('express');
const app = express();

app.use(express.static(__dirname+'/public'))

var urls={
    '/test': "https://google.com"
}

function sendUrl(url, res) {
    res.send('<script>window.location.href = "' + url + '"</script>')
}

app.get('/', function(req,res){
    res.sendFile('./index.html')
})
app.get('/cr-url', function(req,res) {

    var note = "Successful generation. Your shortened URL will expire in 30 minutes.<br>"

    let name = req.query.name
    let url = req.query.url

    if (!urls[name]) {
        urls[name] = url
    }else{
        return res.send('This URL is already in use. Please choose another one or wait for this URL to get cleared. <a href="./">Go back</a>')
    }
    res.send(note+'<a href="https://url.ehd.lol'+name+'">https://url.ehd.lol'+name+'</a>')
    setTimeout(function(){urls[name] = false}, 1800000)
})

app.get('*', function(req,res) {
    if (!urls[req.originalUrl]) {
        return res.send('url not found')
    }
    res.send('<script>window.location.href = "' + urls[req.originalUrl] + '"</script>')
})

app.listen(5000, function () {
    console.log('Node server is running..');
});