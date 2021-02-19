let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
})

exports.query = function(sql,params,callback) {
  connection.query(sql,params,(err,data)=>{
    callback && callback(err,data)
  })
}

