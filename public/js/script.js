let menubar = document.querySelector(".menubar");
menubar.addEventListener("click", function(){
    let sidebar = document.querySelector(".sidebar");
    if(window.innerWidth < 400){
        sidebar.style.width = "250px";
    }
    else{
        sidebar.style.width = "300px";
    }
    
    
});

let closeicon = document.querySelector(".closeicon");
closeicon.addEventListener("click", function(){
    let sidebar = document.querySelector(".sidebar");
    sidebar.style.width = "0px";
});



if(window.innerWidth <= 1280){
    let navbarlist = document.querySelector(".navbarlist").cloneNode(true);
    document.querySelector(".navlistshrink").appendChild(navbarlist);
}


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




