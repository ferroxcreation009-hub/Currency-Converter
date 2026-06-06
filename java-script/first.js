const BASE_URL = "https://open.er-api.com/v6/latest";
const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");
 for(let select of dropdowns){
for ( currcode in countryList){
    let newOption = document.createElement("option");
    newOption.value = currcode;
    newOption.innerText = currcode;
    if(select.name == "from" && currcode == "USD"){
        newOption.selected = true;
    } else if(select.name == "to" && currcode == "INR"){
        newOption.selected = true;
    }
    select.appendChild(newOption);
}
select.addEventListener("change", e =>{
    updateFlag(e.target);
});
 }
 const updateFlag = (element) =>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newSrc;
 };
 btn.addEventListener("click",async (e) =>{
    e.preventDefault();

    let amount = document.querySelector(".amount input").value;
    let amtVal=amount.value;
    if(amount == "" || amount == "0"){
        amtVal = 1;
        amount.value = 1;
    }
    
const URL = `${BASE_URL}/${fromCurr.value}`;
let response = await fetch(URL);
let data = await response.json();
let rate = data.rates[toCurr.value];
let finalAmt = (amount * rate).toFixed(2);
msg.innerText = `${amount} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
});
