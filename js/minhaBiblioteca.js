import { convertTokenToUser } from "./getUser.js";

const PAI_CARD = document.querySelector("#pai-card");
const FILTROS = document.querySelector("#filtros");
const SELECIONE_FILTROS = document.querySelector("#selecioneFiltros");
const FUNCOES_FILTRO = document.querySelector('#funcoes-filtro');

let filtro = document.querySelector("#botao-filtro");
let menu = document.querySelector("#filtros");

const URL = "http://localhost/api.biblioteca";

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
FILTROS.addEventListener("click", async (element) => {
    PAI_CARD.innerHTML = ``;
    let user = await convertTokenToUser();
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
                `;

                let livrosOrdenados = await fetch(URL + "/minhaBiblioteca/autor",
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                livrosOrdenados = await livrosOrdenados.json();

                for(let i = 0; i < livrosOrdenados.length; i++)
                {
                    PAI_CARD.innerHTML += `
                    <div class="card">
                        <div class="options">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="crimson" class="trash" viewBox="0 0 16 16">
                                <path class="trash" d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </div>
                        <img src="${livrosOrdenados[i]["path"]}" alt="capa de livro">
                        <p>${livrosOrdenados[i]["titulo"]}</p>
                        <p>${livrosOrdenados[i]["autor"]}</p>
                        <p style="opacity: 0;" class="code">${livrosOrdenados[i]["cod_reserva"]}</p>
                    </div>
                `;
                }
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
                `;

                let livrosOrdenados = await fetch(URL + "/minhaBiblioteca/titulo",
                {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                })
                livrosOrdenados = await livrosOrdenados.json();

                for(let i = 0; i < livrosOrdenados.length; i++)
                {
                    PAI_CARD.innerHTML += `
                    <div class="card">
                        <div class="options">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="crimson" class="trash" viewBox="0 0 16 16">
                                <path class="trash" d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                        </div>
                        <img src="${livrosOrdenados[i]["path"]}" alt="capa de livro">
                        <p>${livrosOrdenados[i]["titulo"]}</p>
                        <p>${livrosOrdenados[i]["autor"]}</p>
                        <p style="opacity: 0;" class="code">${livrosOrdenados[i]["cod_reserva"]}</p>
                    </div>
                `;
                }
                
            }
            break;
    }
});
FUNCOES_FILTRO.addEventListener("click", async (element) => {
    if(element.target.className == "close"){
        PAI_CARD.innerHTML = ``;
        element.target.parentNode.parentNode.removeChild(element.target.parentNode);
        let livrosOrdenados = await fetch(
            URL + "/minhaBiblioteca",
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        )
        livrosOrdenados = await livrosOrdenados.json();

        for(let i = 0; i < livrosOrdenados.length; i++)
        {
            PAI_CARD.innerHTML += `
            <div class="card">
                <div class="options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="crimson" class="trash" viewBox="0 0 16 16">
                        <path class="trash" d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" data-trash="true"/>
                    </svg>
                </div>
                <img src="${livrosOrdenados[i]["path"]}" alt="capa de livro">
                <p>${livrosOrdenados[i]["titulo"]}</p>
                <p>${livrosOrdenados[i]["autor"]}</p>
                <p style="opacity: 0;" class="code">${livrosOrdenados[i]["cod_reserva"]}</p>
            </div>
        `;
        }
    }
});
PAI_CARD.addEventListener("click", async (element) => {
    
    if(element.target.className.baseVal == "trash")
    {
        let card;

        if (element.target.parentNode.parentNode.className == "card"){
            card = element.target.parentNode.parentNode;
        }
        else if(element.target.parentNode.parentNode.parentNode.className == "card"){
            card = element.target.parentNode.parentNode.parentNode;
        }
        
        if(confirm("Deseja realmente excluir este livro?") == true){
            let resultados = await fetch(URL + `/minhaBiblioteca`,
            {
                method: "DELETE",
                headers:
                {
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "code": card.lastElementChild.innerText
                })
            });
            
            resultados = await resultados.json();
            
            if(resultados.status == 200)
            {
                alert("O livro foi removido com sucesso!");
                location.reload(true);
            }
        }

    };
    
});
async function renderMain()
{
    let user = await convertTokenToUser();

    if(user)
    {
        document.querySelector("#btn-entrar").innerHTML = `
            <div id="perfil">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
                <a href="perfil.html">${user}</a>
            </div>
        `;
        fetch(
            URL + "/minhaBiblioteca", 
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        ).then(
            function(response){
                return response.json();
            }
        ).then(
            function(response){
                for(let book in response)
                {
                    PAI_CARD.innerHTML += `
                        <div class="card">
                            <div class="options">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="crimson" class="trash" viewBox="0 0 16 16">
                                    <path class="trash" d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </div>
                            <img src="${response[book]["path"]}" alt="capa de livro">
                            <p>${response[book]["titulo"]}</p>
                            <p>${response[book]["autor"]}</p>
                            <p style="opacity: 0;">${response[book]["cod_reserva"]}</p>
                        </div>
                    `;
                }
            }
        )
    }else{
        PAI_CARD.innerHTML = "Não há nada aqui!";
    }
}
renderMain();