//clean data

var title = document.getElementById("title")
var price = document.getElementById("price")
var taxes = document.getElementById("taxes")
var ads = document.getElementById("ads")
var discount = document.getElementById("discount")
var total = document.getElementById("total")
var count = document.getElementById("count")
var category = document.getElementById("category")
var submit = document.getElementById("submit")

var mood = 'create'
var tmp;
    //get total
function getTotal() {
    if(price.value != ""){
        var result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }

}
    //creat product

var prodData ;

if(localStorage.product != null){
    prodData = JSON.parse(localStorage.product)
}else{
     prodData = [];
}

submit.onclick = function (){

    var newpro ={
        title    : title.value.toLowerCase(),
        price    : price.value,
        taxes    : taxes.value,
        ads      : ads.value,
        discount : discount.value,
        total    : total.innerHTML,
        count    : count.value,
        category : category.value.toLowerCase(),
    }

   if(title.value != "" && price.value != ""  && category.value != ""&&newpro.count < 100){
    if(mood === 'create'){
        //count
    if(newpro.count >1){
        for (var i = 0; i < newpro.count; i++) {
            prodData.push(newpro);
            
        }
    }else{

        prodData.push(newpro);
    }

    }else{
        prodData[ tmp ] = newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block'

    }
    clearInput()

   } 

    //save localstorage
    localStorage.setItem('product', JSON.stringify(prodData) )
    displayprou()
    getTotal()

}

    //clear inputs
function clearInput() {

        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        title.value = ''
        total.innerHTML = ''
        count.value = ''
        category.value = ''

}

//read
function displayprou(){
    var cartoona = "";
    for (var i = 0; i < prodData.length; i++) {
        
        cartoona += `
        <tr>
        <td>${i+1}</td>
        <td>${prodData[i].title}</td>
        <td>${prodData[i].price}</td>
        <td>${prodData[i].taxes}</td>
        <td>${prodData[i].ads}</td>
        <td>${prodData[i].discount}</td>
        <td>${prodData[i].total}</td>
        <td>${prodData[i].category}</td>

        <td><button onclick="updateData( ${i} ) " id="update">update</button></td>
        <td><button onclick="deletProu( ${i} ) " id="delete">delete</button></td>
    
    </tr>
        `;
    }

    document.getElementById("tBody").innerHTML = cartoona
    // deleteAll
    var btnDelet = document.getElementById("deleteAll")
    if(prodData.length > 0){
        btnDelet.innerHTML = `
        <td><button onclick="deleteAll()">delet All (${prodData.length})</button></td> `
    }else{
        btnDelet.innerHTML = ""
    }

}
displayprou()

    //delete
function deletProu(i) {

    prodData.splice(i,1)
    localStorage.product =JSON.stringify(prodData)
    displayprou()

}

    //deleteAll
function deleteAll(){

    prodData.splice(0)
    localStorage.clear()
    displayprou()
}
    
      //update
function updateData(i){

    title.value = prodData[i].title;
    price.value = prodData[i].price;
    taxes.value = prodData[i].taxes;
    ads.value   = prodData[i].ads;
    discount.value   = prodData[i].discount;
    getTotal()
    count.style.display = "none"
     category.value = prodData[i].category;
     submit.innerHTML = 'Update';

     mood='Update';
     tmp = i;
     scroll({
        top :0

     })
}

//search
var searchMood = 'title';

function getSearchMood(id) {

    var search = document.getElementById("search")

    if(id =='searchTitle' ){
    searchMood = 'title'
    search.placeholder ='Search By Title';
}else{
    searchMood = 'category'
    search.placeholder ='Search By Category';

}
search.focus()
search.value = ""
displayprou()

}

function searchData(value) 
{
    var cartoona ="";
    if (searchMood == 'title') {
        
        for (var i = 0; i < prodData.length; i++) {
            if(prodData[i].title.includes(value.toLowerCase())){
                cartoona += `
        <tr>
        <td>${i}</td>
        <td>${prodData[i].title}</td>
        <td>${prodData[i].price}</td>
        <td>${prodData[i].taxes}</td>
        <td>${prodData[i].ads}</td>
        <td>${prodData[i].discount}</td>
        <td>${prodData[i].total}</td>
        <td>${prodData[i].category}</td>

        <td><button onclick="updateData( ${i} ) " id="update">update</button></td>
        <td><button onclick="deletProu( ${i} ) " id="delete">delete</button></td>
    
    </tr>
        `;

            }  
        }
    }
    
    
    else{
        for (var i = 0; i < prodData.length; i++) {
            if(prodData[i].category.includes(value.toLowerCase())){
                cartoona += `
        <tr>
        <td>${i}</td>
        <td>${prodData[i].title}</td>
        <td>${prodData[i].price}</td>
        <td>${prodData[i].taxes}</td>
        <td>${prodData[i].ads}</td>
        <td>${prodData[i].discount}</td>
        <td>${prodData[i].total}</td>
        <td>${prodData[i].category}</td>

        <td><button onclick="updateData( ${i} ) " id="update">update</button></td>
        <td><button onclick="deletProu( ${i} ) " id="delete">delete</button></td>
    
    </tr>
        `;

            }

            
            
            
            
        }
    }

    document.getElementById("tBody").innerHTML = cartoona

}
