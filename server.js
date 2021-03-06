var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
    user:'nandhiniks92',
    database:'nandhiniks92',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
/*var articles={
     'article-one':{
        title:'My article one',
        heading:'Article ONE',
        date:'13 th August 2017',
        content:`
        <p>This is my article one. just addded html tag file in it This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it
        </p>`
    
    },
     'article-two':{
         title:'My article two',
        heading:'Article TWO',
        date:'10 th August 2017',
        content:`
        <p>This is my article two. just addded html tag file in it 
        </p>`
    
    },
     'article-three':{
         title:'My article three',
        heading:'Article Three',
        date:'5 th August 2017',
        content:`
        <p>This is my article three.
            jsut checking
        </p>`
        }

};*/
function createTemplate(data){
    var title=data.title;
    var date= data.date;
    var content=data.content;
    var heading=data.heading;
var htmlTemplate=`
<html>
    <head>
    <title>
       ${title}
    </title>
    <meta name='viewpoint' content="width-device-width,intial-scale=1"/>
    <link href="/ui/style.css" rel="stylesheet"/>
    </head>
    <body>
   
      <div>
        <a href="https://imad.hasura.io/index.html">Home</a>
        <hr>
       </div>
        <h3> ${heading}</h3>
       <div>
         ${date.toDateString()}
       </div>
       ${content}
    
    </body>
</html>

`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    console.log(input);
      var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","1000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
console.log('in');
   var hashedString=hash(req.params.input,'this is secrete password') ;
   res.send(hashedString);
   
   
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('insert into "users"(username,password)values($1,$2)',[username,dbString],function(err,result){
        if(err)
        {
               res.status(500).send(err.toString());
       }else{
           res.send('User Successfully Create'+username);
        }
    });
});



app.get('/articles/:articleNames',function(req,res){
   //  res.sendFile(path.join(__dirname,'ui', 'activity_one.html'));
   console.log(req.params.articleNames);
   pool.query("select * from articles where title=$1",[req.params.articleNames],function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }else{
          if(result.rows.length===0)
          {
              res.status(404).send('Article no found!');
          }else
          {
              var articleData=result.rows[0];
             res.send(createTemplate(articleData));
             
          }
       }
       
    
});

   
  // var articleNames=req.params.articleNames;
   //res.send(createTemplate(articles[articleNames]));
});
/*app.get('/myarticle-second',function(req,res){
    res.sendFile(path.join(__dirname,'ui', 'activity_two.html'));
});
app.get('/myarticle-third',function(req,res){
    res.sendFile(path.join(__dirname,'ui', 'activity_three.html'));
});*/
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var pool=new Pool(config);
app.get('/test-db',function(req,res){
   pool.query('select * from test',function(err,result)
   {
       if(err)
       {
           res.status(500).send(err.toString());
           
       }else
       {
           res.send(JSON.stringify(result.rows));
       }
   }) ;
});

var counter=0;
app.get('/counter',function(req,res){
   counter=counter+1;
   res.send(counter.toString());
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
