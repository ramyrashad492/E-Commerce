// obj to store json 
var obj;
//our category
var electronics;
var jewelery;
var men;
var woman;
var pages;
//pagintion  current page
var page =1;
//to show 3 item in each page in pagenation
var records_per_page = 3;
// to pass it to countinue pagenation
var currentPage;
var loginValid = false;
var itemCount=0;
var cfilter;


// function to get all prouducts
function getdata() {


    fetch("https://mocki.io/v1/1a13d8e5-5da9-4637-ba44-4fb6726bb76e")
      .then(res => res.json())
      .then(data => obj = data)
      .then(() => splitCategory())
}

//function to split prouducts to categorys
function splitCategory() {
   jewelery=obj.filter(data=> data.category == "jewelery");
  console.log(jewelery);
   electronics=obj.filter(data=> data.category == "electronics");
  console.log(electronics);
   men=obj.filter(data=> data.category == "men's clothing");
  console.log(men);
  woman=obj.filter(data=> data.category == "women's clothing");
  console.log(woman);

//to cheack which page is called
switch (pages) {
    case 'Accessories':
    currentPage=jewelery;
    cfilter='Accessories';

    changePage(jewelery);
      break;
      case 'Men':
      currentPage=men;
      cfilter='Men';

      changePage(men);

      break;
      case 'Women':
      currentPage=woman;
      cfilter='Women';

      changePage(woman);
      break;
      case 'Electronics':
      currentPage=electronics;
      cfilter='Electronics';

    changePage(electronics);
      break;
  
    default:
      break;
  }
  
}

// function to cread card in html pages





// to detect current category
 function setcate(categoo) {
   getdata();

   pages=categoo;
   
   
 } 











 // function to prev page  in pageination 
 function prevPage()
 {
     if (page > 1) {
      page--;
         changePage(currentPage);
     }
 }
 
  // function to next page  in pageination 
 function nextPage()
 {
     if (page < numPages()) {
      page++;
         changePage(currentPage);
     }
 }

 // function create cards and show it in pagention
 function changePage(categoryType)
 {
   console.log(categoryType);
   console.log(page)
     var btn_next = document.getElementById("btn_next");
     var btn_prev = document.getElementById("btn_prev");
     var listing_table = document.getElementById("listingTable");
     var page_span = document.getElementById("page");
  
     // Validate page
     if (page < 1) page = 1;
     if (page > numPages()) page = numPages();
 
     listing_table.innerHTML = "";
 
     for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < categoryType.length; i++) {
      let cardDiv = document.createElement("div");
      cardDiv.className='col-lg-4 col-md-6';
      cardDiv.id=i;
      var storgeid=0;

      
      //cardbody
      let cardBody=document.createElement('div');
      cardBody.className='product__item';
      //img div
      imgDiv=document.createElement('div');
      imgDiv.className='product__item__pic set-bg';
      
      //add img to div img 
      imgElement=document.createElement('img');
      imgElement.src=categoryType[i].image;
      imgDiv.appendChild(imgElement);
      
       // icons for porudct card when hover
       ulIconElement=document.createElement('ul');
       ulIconElement.className='product__hover';
       
       // first li for expand icon
       liExpandElement=document.createElement('li');
       aExpandElement=document.createElement('a');
      
       aExpandElement.className='image-popup';
       expandIcon=document.createElement('span');
       expandIcon.className='fas fa-expand-alt';
       //add icon to a
       aExpandElement.appendChild(expandIcon);
      //add a to li
      liExpandElement.appendChild(aExpandElement);
      //add li to ul 
      ulIconElement.appendChild(liExpandElement);
      
      
      // li for fav icon
      liFavElement=document.createElement('li');
       aFavElement=document.createElement('a');
       //favou icon
       var favIcon=document.createElement('span');
       favIcon.className='far fa-heart';
       aFavElement.appendChild(favIcon);
      
       //add a to li
       liFavElement.appendChild(aFavElement);
      //add li to ul 
      ulIconElement.appendChild(liFavElement);
      
       // last li for shopping icon
      liShopElement=document.createElement('li');
      popDivElemet=document.createElement('div');
      popDivElemet.className='popup';
      popSpan=document.createElement('span');
      popSpan.className='popuptext';
      popSpan.id="myPopup"+i;
      poptext=document.createTextNode('Added Sucsess');
      popSpan.appendChild(poptext);
      popDivElemet.appendChild(popSpan);
      liShopElement.appendChild(popDivElemet);
      aShopElement=document.createElement('a');
      shopIcon=document.createElement('span');
      shopIcon.className='fas fa-shopping-cart';
      aShopElement.appendChild(shopIcon);
      shopIcon.onclick= function (){
        cheackOut(storgeid,cardDiv.id,categoryType);
        
      }
      
      //add a to li
      liShopElement.appendChild(aShopElement);
      //add li to ul 
      ulIconElement.appendChild(liShopElement);
      
      //divcontent
      contentDiv=document.createElement('div');
      contentDiv.className='product__item__text';
      //title 
      titleElement=document.createElement('h6');
      atext=document.createElement('a');
      // stars
      stardiv=document.createElement('div');
      stardiv.className= 'rating';
      starIcon=document.createElement('i');
      starIcon.className='fa fa-star';
      // to add stars
      for (let x = 0; x < categoryType[i].rating.rate; x++) {
      var stars =starIcon.cloneNode(true);
      stardiv.appendChild(stars);
      }
      
      //add stars to content div
      contentDiv.appendChild(stardiv);
      
      let productTitle=document.createTextNode(categoryType[i].title);
      atext.appendChild(productTitle);
      //add title to content div
      contentDiv.appendChild(atext);
      atext.onclick= function (){
        displayProduct(cardDiv.id,categoryType);
        
      }
      
      //price
      priceElement=document.createElement('div');
      priceElement.className='product__price';
      let productPrice=document.createTextNode(categoryType[i].price+"$");
      priceElement.appendChild(productPrice);
      //add price element to content div
      contentDiv.appendChild(priceElement);
      
      //add ul to img div
      imgDiv.appendChild(ulIconElement);
      
      //add imgcard to card body
      cardBody.appendChild(imgDiv);
      //add content to card body
      cardBody.appendChild(contentDiv);
      // add card body to card dive
      cardDiv.appendChild(cardBody);
      console.log(cardDiv);
      var cardRow = document.getElementById('listingTable');
      // finally the card 
      cardRow.appendChild(cardDiv);

    }
     page_span.innerHTML = page + "/" + numPages();
 // to hidden prev btn if in first page
     if (page == 1) {
         btn_prev.style.visibility = "hidden";
         
     }  

     else {
         btn_prev.style.visibility = "visible";
     }
 // to hidden next btn if in last page
     if (page == numPages()) {
         btn_next.style.visibility = "hidden";
     } else {
         btn_next.style.visibility = "visible";
     }
 }


// to caculate how many pages i have to display
 
 function numPages()
 {
     return Math.ceil(currentPage.length / records_per_page);
 }
 








//checkName
function checkName(e) {
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(e.which);
    console.log(key);
    if (regex.test(key)) {
       e.preventDefault();
       return false;
    }
    //return (key >= 'A' && key <= 'Z') || (key >= 'a' && key <= 'z');
}

var validname = false, validpass = false, username, pass;

function signUp(e){

    if(validname == true && validpass == true)
    {
        localStorage.setItem('username',username);
        localStorage.setItem('password',pass);

        window.location.href = "logins.html";   
    }
    else {
        e.preventDefault();
        alert("Plz correct the validation errors first");
        return ;
    }
}
function blr(x){
    if(x.value.length > 3){   
        validname = true;
        username = x.value;
        document.getElementById('invalidname').innerHTML="<i class='fas fa-check'></i>";
    }
    else{
        document.getElementById('invalidname').innerHTML="<i class='glyphicon glyphicon-remove'></i>";
    }
}
function checkp(x){
    if(x.value.length < 4){
        document.getElementById('invalidpass').innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
    }
    else{
        document.getElementById('invalidpass').innerHTML = "<i class='fas fa-check'></i>";
    }
}
function checkiden(x){
    if(document.getElementById('pass').value != null && (document.getElementById('pass').value === document.getElementById('rpass').value)){
        validpass = true;
        pass = x.value;
        document.getElementById('invalidRpass').innerHTML = "<i class='fas fa-check'></i></br>";
        document.getElementById('invalidtext').innerHTML = "PerfectO!";
    }
    else{
       document.getElementById('invalidRpass').innerHTML = "<i class='glyphicon glyphicon-remove'></i></br>";
       document.getElementById('invalidtext').innerHTML = "NotSame!";
    }
}

function logins(){
    console.log("login")
    if((document.getElementById('loginName').value == localStorage.username) && (document.getElementById('loginPass').value==localStorage.password)){
        alert(' vaild');
            loginValid=true;
        localStorage.setItem('loginValid',loginValid);
        window.close();

        window.open('index.html');
    }
    else
    {
        alert(' imvaild');
        loginValid=false;
        console.log('in vaild')
        localStorage.setItem('loginValid','false')
        
 
    }
}



// function that show home page login or not

function changHome() {
    var part1= document.getElementById('nav-change-1');
    var part2=document.getElementById('nav-change-2');
    if(localStorage.loginValid=='true')
    {
        
        aSingupElm=document.createElement('a');
        aSingupElm.href='#';
        aSingupElm.className='nav-link';
        var testSingup=document.createTextNode(localStorage.username +" / ");
        aSingupElm.appendChild(testSingup);
        part1.appendChild(aSingupElm);


        aLogoutElm=document.createElement('a');
        aLogoutElm.href='#';
        aLogoutElm.className='nav-link';
       
        
        var testLogout=document.createTextNode('logout');
        aLogoutElm.appendChild(testLogout);
        part2.appendChild(aLogoutElm);
        aLogoutElm.onclick= function () {
            logoutFun();

          
            
        }
       
        
    }
    else 
    {
        

        aSingupElm=document.createElement('a');
        aSingupElm.href='signUp.html';
        aSingupElm.className='nav-link';
        var testSingup=document.createTextNode('Sing UP /');
        aSingupElm.appendChild(testSingup);
        part1.appendChild(aSingupElm);


        aLoginElm=document.createElement('a');
        aLoginElm.href='login.html';
        aLoginElm.className='nav-link';
        var testLoginup=document.createTextNode('Login');
        aLoginElm.appendChild(testLoginup);
        part2.appendChild(aLoginElm);
        document.getElementById('cardCounter').innerText="";
    }
    
}
 // to logout 
function logoutFun() {
    localStorage.setItem('loginValid',0);
    location.reload(true);
    changHome();
}












var arryOfPro=new Array();


function cheackOut(itemarry,current , prou) {
    if (localStorage.loginValid=='true') {
            let storgeid;
        switch (cfilter) {
            case 'Accessories':
           storgeid= parseInt(current)+20;
    
              break;
              case 'Men':
              storgeid= parseInt(current)+40;
    
              break;
              case 'Women':
              storgeid= parseInt(current)+60;
    
              break;
              case 'Electronics':
              storgeid= parseInt(current)+80;
    
              break;
          
            default:
              break;
          }
          if(JSON.parse(localStorage.getItem("quentinTarantino"))!=null){
            arryOfPro=JSON.parse(localStorage.getItem("quentinTarantino"));
            arryOfPro.push(storgeid);

          localStorage.setItem("quentinTarantino", JSON.stringify(arryOfPro));
          console.log(localStorage.getItem("quentinTarantino"));

          }else
          {
            arryOfPro.push(storgeid);
            localStorage.setItem("quentinTarantino", JSON.stringify(arryOfPro));
          }
          
       let titles ='title'+storgeid;
       let prices= 'price'+storgeid;
       let imges= 'image'+storgeid;
       localStorage.setItem(titles,prou[current].title);
       localStorage.setItem(prices,prou[current].price);
       localStorage.setItem(imges,prou[current].image);
       

       var popup = document.getElementById("myPopup"+current);
       popup.classList.toggle("show");

       setTimeout(function () {

        popup.classList.toggle("show");

       },1500)
     

    }
    else{
       window.location.href = "login.html";   

    }
 
    cardQunter() ;

}











var counter;
var total=0;

// funtion to show item in cheack out
function showItemCard() {
    console.log('show iteam');
    console.log(itemCount);
 counter=JSON.parse(localStorage.getItem("quentinTarantino"));
   console.log(counter.length);
    for (let index = 0; index <counter.length ;index++) {
        var qunta1=("pquantity"+index).toString();
        console.log(qunta1);

        let titles ='title'+counter[index];
        let prices= 'price'+counter[index];
        let imges= 'image'+counter[index];
        var tableRow= document.createElement('tr');

        var tBody= document.getElementById('cardItem');
// td for img and title
    var tdCardItem= document.createElement('td');
    tdCardItem.className='shoping__cart__item';
    var imgCardItem =document.createElement('img');
    imgCardItem.src=localStorage.getItem(imges);
    var titleCardItem =document.createElement('h5');
    titleCardItemText=document.createTextNode(localStorage.getItem(titles));
    titleCardItem.appendChild(titleCardItemText);
    tdCardItem.appendChild(imgCardItem);
    tdCardItem.appendChild(titleCardItem);
// td for price
    var tdCardPrice= document.createElement('td');
    tdCardPrice.className='shoping__cart__price';
   var PriceCardItem=document.createTextNode(localStorage.getItem(prices));
    tdCardPrice.appendChild(PriceCardItem);

// quentity
    var tdItemQuen= document.createElement('td');
    tdItemQuen.className='shoping__cart__quantity';

    var qunDive= document.createElement('div');
    qunDive.className='quantity';

    
    var proqunDive= document.createElement('div');
    proqunDive.className='pro-qty';

    var inputQun=document.createElement('input');
    inputQun.type='number';
    console.log('quntabeor'+localStorage.qunta1)
    if (localStorage.getItem(qunta1)!=undefined) {
        console.log('qqqq'+localStorage.getItem(qunta1));
        inputQun.value=localStorage.getItem(qunta1);
    } else {
        console.log('xxxx'+localStorage.qunta1);

        inputQun.value=1;

    }


    proqunDive.appendChild(inputQun);
    qunDive.appendChild(proqunDive);
    tdItemQuen.appendChild(qunDive);

//td total
var tdCardTotal= document.createElement('td');
tdCardTotal.className='shoping__cart__total';
var totalCardItemPrice;
if (localStorage.getItem(qunta1)!=undefined) {
    totalCardItemPrice=document.createTextNode(localStorage.getItem(prices)*localStorage.getItem(qunta1));

} else {
    totalCardItemPrice=document.createTextNode(localStorage.getItem(prices));

}
tdCardTotal.appendChild(totalCardItemPrice);
var subtotal=parseFloat (tdCardTotal.textContent);
total+=subtotal;
console.log(total);
// remove item icon
var removeCardItem= document.createElement('td');
var removeCardIcon= document.createElement('span');
removeCardIcon.className='icon_close';
removeCardItem.appendChild(removeCardIcon);  

//append all td to tr
tableRow.appendChild(tdCardItem);
tableRow.appendChild(tdCardPrice);
tableRow.appendChild(tdItemQuen);
tableRow.appendChild(tdCardTotal);
tableRow.appendChild(removeCardItem);
tBody.appendChild(tableRow);

    }
    






var totalcard= document.getElementById('Totalcard');
totalcard.innerHTML=total.toFixed(2);
var finalTotal= document.getElementById('finaltotal');
finalTotal.innerHTML=total.toFixed(2);


    
}


// display product in product page


function displayProduct(index,categ) {
    //set data from clicked card
    localStorage.setItem('id',categ[index].id);
    localStorage.setItem('title',categ[index].title);
    localStorage.setItem('price',categ[index].price);
    localStorage.setItem('description',categ[index].description);
    localStorage.setItem('category',categ[index].category);
    localStorage.setItem('image',categ[index].image);
    localStorage.setItem('rate',categ[index].rating.rate);
    localStorage.setItem('count',categ[index].rating.count);
    window.open('product.html');
  
  
  
  }


function getProductData() {
    var pImg =document.getElementById('pImg');
var pTitle= document.getElementById('pTitle');
var pPrice =document.getElementById('pPrice');
var pDescri=document.getElementById('pDescri');

pPrice.innerHTML=localStorage.price;
pTitle.innerHTML=localStorage.title;
pDescri.innerHTML=localStorage.description;
pImg.src=localStorage.image;

}




function productToCard() {
   
    if (localStorage.loginValid=='true') {
      
        
    if (localStorage.itemCount!= null) {
        itemCount=localStorage.itemCount;
        itemCount++;
    
        localStorage.setItem('itemCount',itemCount);
    
    } else {

                localStorage.setItem('itemCount',itemCount);

    }
        var aAddToPro=document.getElementById('addToCardP');
        aAddToPro.innerHTML='Sucsess Added';
        aAddToPro.style.backgroundColor="#155472";

        var pImg =document.getElementById('pImg');
        var pTitle= document.getElementById('pTitle');
        var pPrice =document.getElementById('pPrice');
        var pqunt=document.getElementById('pquantity');
        console.log(pTitle.textContent);
        console.log(pPrice.textContent);
        console.log(pImg.src);
        console.log(pqunt.value);

        localStorage.setItem('title'+itemCount,pTitle.textContent);
    localStorage.setItem('price'+itemCount,pPrice.textContent);
    localStorage.setItem('image'+itemCount,pImg.src);
    localStorage.setItem("pquantity"+itemCount,pqunt.value);


    console.log(itemCount);



        if(JSON.parse(localStorage.getItem("quentinTarantino"))!=null){
            arryOfPro=JSON.parse(localStorage.getItem("quentinTarantino"));
            arryOfPro.push(itemCount);
        
          localStorage.setItem("quentinTarantino", JSON.stringify(arryOfPro));
          console.log(localStorage.getItem("quentinTarantino"));
        
          }else
          {
            arryOfPro.push(itemCount);
            localStorage.setItem("quentinTarantino", JSON.stringify(arryOfPro));
          }
    
          cardQunter() ;
    }
    else{
       window.location.href = "login.html";   

    }

}


function FavProduct() {
    var fav=document.getElementById('favpro');

    if (localStorage.loginValid=='true') {

      
        if(fav.style.backgroundColor=='red')
        {        fav.style.backgroundColor="#fff"; }
        else{
            {        fav.style.backgroundColor="red";

        }
    }}

    else{
       window.location.href = "login.html";   

    }
 


}



function checkCoupon() {
    var couponInput= document.getElementById('coupon');
    var couponCheck= document.getElementById('checkcoupon');
    var subtotal = document.getElementById('finaltotal');
    var lidis=document.getElementById('lidis');
    var firstTotal=document.getElementById('Totalcard');

    

    if (couponInput.value=='HRMS10') {
        firstTotal.style.textDecoration='line-through';
        var dis= parseFloat(subtotal.textContent)-(parseFloat(subtotal.textContent)*10)/100;
        couponCheck.innerHTML= 'valid';
        couponCheck.style.color='green';
        subtotal.innerHTML= dis;
        lidis.textContent='discount';
        var spanDis=document.createElement('span');
        spanDis.innerHTML=-((parseFloat(subtotal.textContent)*10)/100).toFixed(2);
        lidis.appendChild(spanDis);
    } else {
        couponCheck.innerHTML= 'invalid';
        couponCheck.style.color='red';

    }

    
}


function cardQunter() {
    var cardnumber=document.getElementById('cardCounter');
    if (JSON.parse(localStorage.getItem("quentinTarantino"))==null)
     {
        cardnumber.innerHTML="";

    } else {
        cardnumber.innerHTML=JSON.parse(localStorage.getItem("quentinTarantino")).length;

    }

    
}