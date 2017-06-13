module.exports = function(app) {
  app.use('/',(req, res) => {
    res.sendFile('index.html');
  });
}
