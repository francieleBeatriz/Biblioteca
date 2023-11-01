import { convertTokenToUser } from "./getUser.js";

let produto = document.querySelector("#produto");
let titulo = localStorage.getItem("titulo");
titulo = titulo.toLowerCase().replace(/\s/gi, "-");
titulo = titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const URL = "http://localhost/api.biblioteca";

async function renderBtnUser()
{
    let user = await convertTokenToUser();

    if(user)
    {
        document.querySelector("#btn-entrar").innerHTML = `
            <a href="profile.html">
                <div id="perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person" viewBox="0 0 16 16" fill="yellow">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                    </svg>
                    ${user}
                </div>
            </a>
        `;
    }
}
renderBtnUser();

function sectionProduto(titulo, autor, data_lancamento, quantidade_paginas, descricao, imagem_capa)
{
    produto.innerHTML = `
        <img src="${imagem_capa}" alt="${titulo}" id="produto-img">
        <div id="content">
            <div id="title">
                <img src="images/icons/produto/book.svg">
                <span id="produto-titulo">
                    ${titulo}
                </span>
            </div>
            <div id="autor">
                <img src="images/icons/produto/person-fill.svg">
                <span id="produto-autor">
                    ${autor}
                </span>
            </div>
            <div id="data_lancamento">
                <img src="images/icons/produto/calendar-check-fill.svg">
                <span id="produto-data">
                    ${data_lancamento}
                </span>
            </div>
            <div id="quantidade_paginas">
                <img src="images/icons/produto/book-half.svg">
                <span id="produto-paginas">
                    ${quantidade_paginas}
                </span>
            </div>
            <div id="descricao">
                <img src="images/icons/produto/file-earmark-font-fill.svg">
                <span id="produto-descricao">
                    ${descricao}
                </span>
            </div>
        </div>
        <div id="reservar">
            <a>
                <button id="btn-reservar">
                    Reservar
                </button>
            </a>
            <div id="warn">
                <img src="images/icons/produto/exclamation-triangle-fill.svg">
                Não copiamos nenhum livro!
            </div>
        </div>
    `;
}
async function addBookOnMyLibrary(livro)
{

    let dados = await fetch(
        URL + `/minhaBiblioteca`,
        {
            method: "POST",
            body: JSON.stringify(livro)
        }
    )
    dados = await dados.json();

    return dados;
}
function addWarn(message)
{
    alert(message);
}
produto.addEventListener("click", 
    async function (element)
    {
        const USER = document.querySelector("#perfil");

        if(element.target.tagName == "BUTTON" && USER)
        {
            const TITULO = document.querySelector("#produto-titulo");
            const AUTOR = document.querySelector("#produto-autor");
            const DATA_LANCAMENTO = document.querySelector("#produto-data");
            const QUANTIDADE_PAGINAS = document.querySelector("#produto-paginas");
            const DESCRICAO = document.querySelector("#produto-descricao");
            const IMAGEM_CAPA = document.querySelector("#produto-img");
            
            console.log(USER.innerText);

            let response = await addBookOnMyLibrary(
                {
                    "user": USER.innerText,
                    "titulo": TITULO.innerText,
                    "autor": AUTOR.innerText,
                    "path": IMAGEM_CAPA.src.substr(IMAGEM_CAPA.src.indexOf("images"), IMAGEM_CAPA.src.length)
                }
            );

            if(response.status == 200)
            {
                addWarn(response.message);
            }
            else if(response.status == 400)
            {
                addWarn(response.message);
            }
        } 
        else if(element.target.tagName == "BUTTON" && !USER)
        {
            addWarn("Por favor, cadestre-se antes de reservar um livro!");
        }
    }
)

fetch(
    URL + `/livros/${titulo}`,
).then(
    function(response)
    {
        return response.json();
    }
).then(
    function(response)
    {
        let livro = response[0];
        sectionProduto(livro["titulo"], livro["autor"], livro["data_lancamento"], livro["quantidade_paginas"], livro["descricao"], livro["imagem_capa"]);
    }
).catch(
    function(response)
    {
        console.log(response);
    }
)
