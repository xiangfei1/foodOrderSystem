let express =require('express');
let app = express();
let bodyParser = require('body-parser');
let api = require('./api');
let path = require('path');
let fs = require('fs');
// let loginGuart = require('./loginGuart');
// 获取内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use('/admin',loginGuart)

app.use(api)
// 访问静态文件
app.use(express.static(path.resolve(__dirname,'../dist')))

// 跨域设置
app.get("*",function(req,res){
    let html = fs.readFileSync(path.resolve(__dirname,'../dist/index.html'),'utf-8')
    res.send(html)
});


let port = process.env.PORT || 3001;
app.listen(port, () =>{
    console.log("Running 3001.....");
});