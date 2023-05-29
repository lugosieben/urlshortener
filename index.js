const express = require('express');
const app = express();

var urls={
    '/test': "https://google.com"
}

function sendUrl(url, res) {
    res.send('<script>window.location.href = "' + url + '"</script>')
}

app.get('/cr-url', function(req,res) {
    let name = req.query.name
    let url = req.query.url

    if (!urls[name]) {
        urls[name] = url
    }
    res.send('done')
})

app.get('*', function(req,res) {
    if (!urls[req.path]) {
        res.send('url not found')
    }
    sendUrl(urls[req.path], res)
})

app.listen(5000, function () {
    console.log('Node server is running..');
});