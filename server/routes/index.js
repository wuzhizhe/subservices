/* global __dirname */
const path = require('path');
module.exports = function (app) {
  app.use('/', (req, res) => {
    let _path = path.join(__dirname, '..\\..\\');
    res.sendFile(path.join(path.normalize(_path), '/index.html'));
  });
}
