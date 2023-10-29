let trash = document.querySelectorAll(".lixeira");
let card = document.querySelectorAll(".card");

trash[0].addEventListener("mouseover", function (){
    mostraLixeira();
});
trash[1].addEventListener("mouseover", function (){
    mostraLixeira();
});
trash[2].addEventListener("mouseover", function (){
    mostraLixeira();
});
trash[3].addEventListener("mouseover", function (){
    mostraLixeira();
});

trash[0].addEventListener("mouseout", function (){
    escondeLixeira();
});
trash[1].addEventListener("mouseout", function (){
    escondeLixeira();
});
trash[2].addEventListener("mouseout", function (){
    escondeLixeira();
});
trash[3].addEventListener("mouseout", function (){
    escondeLixeira();
});

function mostraLixeira(){
    console.log(trash[0].style.opacity = "1");
    console.log(trash[1].style.opacity = "1");
    console.log(trash[2].style.opacity = "1");
    console.log(trash[3].style.opacity = "1");
}
function escondeLixeira(){
    console.log(trash[0].style.opacity = "0");
    console.log(trash[1].style.opacity = "0");
    console.log(trash[2].style.opacity = "0");
    console.log(trash[3].style.opacity = "0");
}


