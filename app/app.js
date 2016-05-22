//hello world
app.get('/',function(req, res) {
   res.end("Home");
});

app.get('/news',function(req, res) {
   res.end("news");
});

app.get('/test',function(req, res) {
   res.end("Hello world.");
});