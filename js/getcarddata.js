var pImg =document.getElementById('pImg');
var pTitle= document.getElementById('pTitle');
var pPrice =document.getElementById('pPrice');
var pDescri=document.getElementById('pDescri');

pPrice.innerHTML=localStorage.price;
pTitle.innerHTML=localStorage.title;
pDescri.innerHTML=localStorage.description;
pImg.src=localStorage.image;