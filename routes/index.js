var express = require('express');
var router = express.Router();
var fs = require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir("./uploads",{withFileTypes: true},function(err, files){
    res.render('index', {files: files});
  })
});

/* FILE creation  page. */
router.get('/filecreation', function(req, res) {
  fs.writeFile(`./uploads/${req.query.filename}`, "" , function(err){
    if(err){
      res.send(err)
    }else{
      res.redirect("back")
    }
  })
});

/* FOLDER creation  page. */
router.get('/foldercreation', function(req, res) {
  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){
    if(err){
      res.send(err)
    }else{
      res.redirect("back")
    }
  })
});

/* PRESENT file opened */
router.get('/file/:filename', function(req, res, next) {
  fs.readdir("./uploads",{withFileTypes: true},function(err, files){
    fs.readFile(`./uploads/${req.params.filename}`,"utf-8", function(err,data){
      res.render('present', {files: files, filename: req.params.filename, filedata: data});
    })
  })
});

/* FILECHANGE page */
router.post('/filechange/:filename', function(req, res) {
  fs.writeFile(`./uploads/${req.params.filename}`,req.body.filedata,function(err){
    res.redirect("back")
  })
});



module.exports = router;