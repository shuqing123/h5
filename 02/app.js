const express = require('express');
const app = express();
const multer = require('multer');
const fs = require("fs");


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(multer({ dest: './public/tmp'}).array('image'));

app.get('/demo.html', function (req, res) {
    res.sendFile( __dirname + "/" + "demo.html" );
})

app.post('/upload', function (req, res) {

    console.log(req.files[0]);  // 上传的文件信息

    var des_file = __dirname + "/public/tmp" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
})




app.listen(4545);












