window.addEventListener("load", ()=>{
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
});


// FORM PAGE
let alerts = document.querySelectorAll(".alertbox")
if(alerts.length > 0){
    for(let i in alerts){
        alerts[i].addEventListener("click", ()=>{
           alerts[i].remove()        
        });
    }
}


// window.addEventListener("load", ()=>{
//     let closeboxes = document.querySelectorAll(".alertclose")
//     console.log(closeboxes)
//     if(closeboxes.length > 0){
//         let timeout = setTimeout(() => {
//             for(let i in closeboxes){            
//                 closeboxes[i].parentElement.style.display = "none"         
//             }
//         }, 1000);

//     }
// })



let searchbox = document.querySelector("#dropdownSearch");
searchbox.addEventListener("click", ()=>{
    let dropdowncontent = document.querySelector(".dropdown_content");
    if(dropdowncontent.style.display == "block"){
        dropdowncontent.style.display = "none"
    }
    else{
        dropdowncontent.style.display = "block"
    }
});



