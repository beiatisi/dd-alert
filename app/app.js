//hello world
app.get('/',function(req, res) {
   res.end("Home");
});

app.get('/test',function(req, res) {
   res.end("Hello world.");
});