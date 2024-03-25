let express = require('express');
const path = require('path');
let app = express();
const mysql = require('mysql');

app.use(
    express.urlencoded({
      extended: true,
    })
  )
//conexao bd em mysql!!
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ejstesdb"
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

app.use('/backend/public/css', express.static('backend/public/css'));
//render index.ejs!
app.get('/',(req, res)=>{
    res.render('index', 
    {foo: 'HELL NOOOs!!!!', 
    conlog:""});
});
app.get('/backend/public/css/styles.css',(req, res)=>
{
    res.set('content-type', 'text/css');
    res.sendFile(path.join(__dirname, 'backend/public/css/styles.css'));
});
//DISPLAY entradas sql
app.get('/query', (req, res)=>{
    const sql = "SELECT * FROM login";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
//CREATE em SQL!!!!
app.post('/add',async(req, res)=>{
    let emailejs = await req.body.iemejs;
    let userejs = await req.body.iuejs;
    let passejs = await req.body.ipaejs;
    var sqladd = "INSERT INTO login (email, user, passw) VALUES ('"+emailejs+"','"+userejs+"','"+passejs+"')";
    db.query(sqladd, (err, data)=>{
        if(err) throw err;
        console.log("INSERIR SUCESSO!");
    })
    res.render('index', {foo:"HELLO! "+userejs, conlog:"INSERIR SUCESSO!!!"});
})
//DELETE de SQL!
app.post('/del', async(req, res)=>{
    let emailejs = await req.body.iaemejs;
    var sqldel = "DELETE FROM login WHERE email='"+emailejs+"';"
    db.query(sqldel, (err, data)=>{
        if(err) throw err;
        console.log("DELETE SUCESSO!");
    })
    res.render('index', {foo:"HELL YEAHH", conlog:"APAGAR SUCESSO!!!"});
})
//UPDATE em sql!
app.post('/upd', async(req, res)=>{
    let emailejs = await req.body.iupemejs;
    let userejs = await req.body.iupuejs;
    let passejs = await req.body.iuppaejs;
    var sqlupd = "UPDATE login SET email='"+emailejs+"', user='"+userejs+"', passw='"+passejs+"' WHERE email='"+emailejs+"';"
    db.query(sqlupd, (err, data)=>{
        if(err) throw err;
        console.log("UPDATE SUCESSO!!");
        
    })
})


app.listen(8080, () => console.log('app listening on port 8080!'));