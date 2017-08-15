console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHtml='hello';
var img=document.getElementById('madi');
img.onclick=function(){
   var interval=setInterval(moveRight,100);
};
var marginLeft=0;
function moveRight(){
    marginLeft=marginleft+10;
    img.style.marginLeft=marginleft+'px';
}