const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { con } = require('./src/database/connect')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.render(path.join(__dirname, 'src/views', 'index.ejs'))
})
//VIEW DATA
app.get('/viewData', (req, res) => {
    let data = []
    let sql = "SELECT * FROM names"
    con.query(sql, (err, result) => {
        if(err) throw err;
        for(let i = 0 ; i < result.length -1 ; i++ ){
            data.push({
                "id": result[i].id,
                "first_name": result[i].first_name,
                "last_name": result[i].last_name
            })
        }
        res.render(path.join(__dirname, 'src/views', 'view.ejs'), {data : data})
    })
})
//CREATE DATA 
app.post('/createData', (req, res) => {
    let sql = `INSERT INTO names (first_name, last_name) VALUES ('${req.body.first_name}', '${req.body.last_name}') `
    let query = con.query(sql, (err, result) => {
        if(err) throw err
        console.log('Database Inserted')
    })
    res.status(200).redirect('/')
    return query
})
//DELETE DATA
app.get('/deleteData/:id', (req, res) => {
    let sql = `DELETE FROM names WHERE id = '${req.params.id}'`
    con.query(sql, (err, result) => {
        if(err) throw err
        console.log('Database subject Deleted')
    })
    res.status(200).redirect('/viewData')
})
//UPDATE DATA 
app.route('/updateData/:id')
    .get((req, res) => {
        let sql = `SELECT * FROM names WHERE id = ${req.params.id}`
        con.query(sql, (err, result) => {
            if(err) throw err
            res.render(path.join(__dirname, 'src/views', 'update.ejs'), {id:result[0].id , first_name:result[0].first_name, last_name:result[0].last_name})
        })
    })
    .post((req, res) => {
        let sql = `UPDATE names SET first_name='${req.body.first_name}', last_name='${req.body.last_name}' WHERE id='${req.body.id}'`
        con.query(sql, (err, result) => {
            if(err) throw err
            console.log('Database updated!')
        })
        res.status(200).redirect('/viewData')
    })

const PORT = 3000
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})