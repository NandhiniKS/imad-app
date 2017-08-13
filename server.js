var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
     'article_one':{
         title:'My article one',
        heading:'Article ONE',
        date:'13 th August 2017',
        content:`
        <p>This is my article one. just addded html tag file in it This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it
        </p>`
    
    },
     'article_two':{
         title:'My article two',
        heading:'Article TWO',
        date:'10 th August 2017',
        content:`
        <p>This is my article two. just addded html tag file in it 
        </p>`
    
    },
     'article_three':{
         title:'My article three',
        heading:'Article Three',
        date:'5 th August 2017',
        content:`
        <p>This is my article three.
            jsut checking
        </p>`
        }

};
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
       <div>
         ${date}
       </div>
        <h3> ${heading}</h3>
       ${content}
    
    </body>
</html>

`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/:articleNames',function(req,res){
   //  res.sendFile(path.join(__dirname,'ui', 'activity_one.html'));
   var articleNames=req.params.articleNames;
   res.send(createTemplate(articleNames));
});
app.get('/myarticle-second',function(req,res){
    res.sendFile(path.join(__dirname,'ui', 'activity_two.html'));
});
app.get('/myarticle-third',function(req,res){
    res.sendFile(path.join(__dirname,'ui', 'activity_three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
