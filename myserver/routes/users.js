var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
  res.send('respond with a post ');
});

module.exports = router;
