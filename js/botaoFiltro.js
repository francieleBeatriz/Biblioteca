let filtro = document.querySelector("#botao-filtro");
let menu = document.querySelector("#filtros");

filtro.addEventListener('click', 
    function(){
        if(menu.style.display === 'block'){
            menu.style.display = 'none';
        }
        else{
            menu.style.display ='block';
        }      
    }
)

const FILTROS = document.querySelector("#filtros");
const SELECIONE_FILTROS = document.querySelector("#selecioneFiltros");

        FILTROS.addEventListener("click", (element) => {
            switch(element.target.tagName)
            {
                case "BUTTON":
                    let filter = document.querySelector("#filter");
                    if(element.target.id == "autor-A-Z" && !filter)
                    {
                        SELECIONE_FILTROS.innerHTML += `
                            <div id="filter">
                                <p>
                                Autores de A a Z
                                </p>
                                <button class="close">x</button>
                            </div>
                        `
                    }
                    else if(element.target.id == "titulo-A-Z" && !filter)
                    {
                        SELECIONE_FILTROS.innerHTML += `
                            <div id="filter">
                                <p>
                                    Titulo de A a Z
                                </p>
                                <button class="close">x</button>
                            </div>
                        `
                    }
                    break;
                }
        });
const funcoesFiltro = document.querySelector('#funcoes-filtro');

funcoesFiltro.addEventListener("click", (element) => {
    if(element.target.className == "close"){
        element.target.parentNode.parentNode.removeChild(element.target.parentNode);
        console.log(element.target.parentNode.parentNode);
    }
});