const express = require('express');
const app = express();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/public')
    },
    filename: function (req, file, cb) {
        let filename = file.originalname.split('.');
        cb(null, `${Date.now()}.${filename[filename.length-1]}`);
    }
})
const upload = multer({storage: storage});

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));


//头信息解决跨域
app.use(function (req,res,next) {
    res.header('Access-Control-Allow-Origin','*');
    //res.header('Access-Control-Allow-Credentials','true');
    //res.header('Access-Control-Allow-Methods','POST');
    next();
});
//
app.get('/',function (req,res) {
    console.log(req.query);
    res.send("hellow word")
})

app.post('/p',function (req,res) {
    console.log(req.headers.cookie);
    console.log(req.body);
    res.send({code:0})
})

//jsonp解决跨域问题

app.get('/jsonp',(req,res)=>{
    const str=`${req.query.cb}(${JSON.stringify({xiaoming:'100fen'})})`
    res.send(str)
})

let arr = [];
app.post('/upload', function (req,res) {
    upload.single('file')(req, res, function (err) {
        let str = `${req.file.destination}/${req.file.filename}`
        arr.push(str);
        res.send('111')
    })
});
console.log(arr);


app.listen(7777);

/*
跨域
不同域名
不同端口
不同协议
*/











