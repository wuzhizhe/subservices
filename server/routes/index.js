module.exports = function(app) {
  app.use('/',(req, res) => {
    res.sendFile(__rootDir + '/src/public/index.html');
  });
}
