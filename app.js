const baseUrl= "https://api.currencyapi.com/v3/latest?apikey=cur_live_mhGqh3yqkWNZqnuu6WrHynvIG3vWCrVwPPh8gJdp";
let fromDrop= document.querySelector("#dropdown-from");
let toDrop= document.querySelector("#dropdown-to");
let Amount= document.querySelector("#Amount");
let btn= document.querySelector("#convert-btn");
let msg=document.querySelector(".msg p");
let fromFlag= document.querySelector("#from-flag");
let toFlag= document.querySelector("#to-flag");
try{
fromDrop.addEventListener("change",()=>{
    fromFlag.src= `https://flagsapi.com/${countryList[fromDrop.value]}/shiny/64.png`;
    fromFlag.classList.remove("flag");
})

toDrop.addEventListener("change",()=>{
    toFlag.src= `https://flagsapi.com/${countryList[toDrop.value]}/shiny/64.png`;
    toFlag.classList.remove("flag");
})

for(let code in countryList){
    const option1= document.createElement("option")
    option1.innerText= code;
    option1.value= code;
    fromDrop.append(option1);

    const option2= document.createElement("option")
    option2.innerText= code;
    option2.value= code;
    toDrop.append(option2);

};

btn.addEventListener("click",()=>{
const fetchCurrencyData= async()=>{
const Url= `${baseUrl}&currencies=${fromDrop.value},${toDrop.value}`;
let response= await fetch(Url);
let data= await response.json();
console.log("data=", data);

// getting user input //
let amtVal= Amount.value;
console.log(amtVal);

let fromcurr= fromDrop.value;
let tocurr= toDrop.value;

// getting rate //
let rate= data.data[tocurr].value / data.data[fromcurr].value;

let conversion= amtVal * rate.toFixed(3);

// result writing //
msg.innerText=`${amtVal} ${fromcurr}=${conversion} ${tocurr}`;
};

fetchCurrencyData();

});
} catch(error){
    msg.innerText= `Sorry, but value is not available right now`;
}

