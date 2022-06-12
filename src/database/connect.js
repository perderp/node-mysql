const mysql = require('mysql')
const db_data = {
    host:'localhost',
    user:'root',
    password:'',
    database:'simple'
}

const con = mysql.createConnection({
    host:db_data.host,
    user:db_data.user,
    password:db_data.password,
    database:db_data.database
})

con.connect((err) => {
    if(err) throw err
    console.log('Database Connected')
})

module.exports ={ 
    con,
}