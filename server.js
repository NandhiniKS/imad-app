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
        content:` <p>This is my article one. just addded html tag file in it This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it.This is my article one. just addded html tag file in it
        </p>
        
        
    }
    
}
Function CreateTemplate(data)
{
    var title=data.tilte
    var heading=data.heading
    var date=data.date
    var content=data.content
    var htmlTemplate=`   
   <html>
    <head> 
    <link href="/ui/style.css" rel="stylesheet" />
    <title>
        ${title}
    </title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
            <div class="container">
                <div>
                    <a href="/"> Home</a>
                </div>
                <hr/>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}  
                </div>
                <hr/>
            </div>

    </body>
</html> 
`;
return htmlTemplate;
}
}
app.get('/a1', function (req, res) {
res.send(createTemplate (articles[articlename ]));
};
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/myarticle-first',function(req,res){
     res.sendFile(path.join(__dirname,'ui', 'activity_one.html'));
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
