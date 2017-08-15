/*console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHtml='hello';
var img=document.getElementById('madi');
var marginLeft=0;
img.onclick=function(){
   var interval=setInterval(moveRight,50);
};

function moveRight(){
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
}*/
var count=0;

var button=document.getElementById('counter');
button.onClick=function(){
    count=count+1;
    var span=document.getElementById('count');
    span.innerHtml=count.toString();
};
