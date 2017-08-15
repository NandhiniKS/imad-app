console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHtml='hello';
var img=document.getElementById('madi');
var marginLeft=0;
img.onclick=function(){
   var interval=setInterval(moveRight,100);
};

function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}