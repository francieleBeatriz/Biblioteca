import { mensagem } from "./mensagensFeedback.js";
import { convertTokenToUser } from "./getUser.js";

let livrosSlider = document.querySelector("#livros-slider");
let btnProx = document.querySelector("#prox");
let btnVoltar = document.querySelector("#voltar");
let arrowDireita = document.querySelector("#iconProximo");
let arrowEsquerda = document.querySelector("#iconVoltar");

let btnEntrar = document.querySelector("#btn-entrar");

let createBookDiv = document.querySelector("#create-book");
let closeCreateBookForm = document.querySelector("#close-create-form");
let closeUpdateBookForm = document.querySelector("#close-update-form");
let btnCreateBook = document.querySelector("#create"); 
let btnUpdateBook = document.querySelector("#update");

const URL = "http://localhost/api.biblioteca";

// Verificando se o usuário está logado e trocando ENTRAR pelo nick
if(localStorage.getItem("token") != null)
{
    fetch(
        URL + "/user",
        {
            method: "post",
            body: JSON.stringify({
                "Authorization": localStorage.getItem("token")
            })
        }
    ).then(
        function (response)
        {
            return response.json();
        }
    ).then(
        function (response)
        {
            if(response.status != 400)
            {
                btnEntrar.innerHTML = `
                    <div id="perfil">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                        <a href="perfil.html">${response.user}</a>
                    </div>
                `;
            }
        }
    ).catch(
        function (response)
        {
            console.log(response);
        }
    )
}

async function mostrarLivros()
{
    livrosSlider.innerHTML = ``;
    let livros = await fetch(
        URL + "/livros"
    )
    livros = await livros.json();
    
    for(let book in livros)
    {
        livrosSlider.innerHTML += `
            <div class="livro">
                <div class="options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="crimson" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </div>
                <img src="${livros[book]["imagem_capa"]}" alt="${livros[book]["titulo"]}">
                <span style="display: none;" id="cod">${livros[book]["cod"]}</span>
            </div>
        `;
    }
}
mostrarLivros();

// Controle do Slider
function proximo()
{
    if(livrosSlider.scrollLeft == livrosSlider.scrollLeftMax){
        livrosSlider.scrollLeft = 0;
        return;
    }
    livrosSlider.scrollLeft += 610;
}
function voltar()
{
    if(livrosSlider.scrollLeft == 0){
        livrosSlider.scrollLeft = livrosSlider.scrollLeftMax;
        return;
    }
    livrosSlider.scrollLeft += -610;
}

// Criando um livro
function openCreateBookPopUp()
{   
    if(createBookDiv)
    {
        createBookDiv.style.display = "flex";
        document.querySelector("#create-popup").style.display = "flex";
    }
}
function updatePopUp(livro)
{
    if(createBookDiv)
    {
        const TITULO = document.querySelector("#titulo-book");
        const AUTOR = document.querySelector("#autor-book");
        const DATA_LANCAMENTO = document.querySelector("#data-lancamento-book");
        const QUANTIDADE_PAGINAS = document.querySelector("#quantidade-paginas-book");
        const DESCRICAO = document.querySelector("#descricao-book");
        const IMAGEM_CAPA = document.querySelector("#imagem-capa-book");

        createBookDiv.style.display = "flex";
        document.querySelector("#update-popup").style.display = "flex";
        
        TITULO.value = livro["titulo"];
        AUTOR.value = livro["autor"];
        DATA_LANCAMENTO.value = livro["data_lancamento"];
        QUANTIDADE_PAGINAS.value = livro["quantidade_paginas"];
        DESCRICAO.value = livro["descricao"];
        IMAGEM_CAPA.value = livro["imagem_capa"];
    }
}
async function updateOnBD(cod, titulo)
{
    console.log(cod);
    const TITULO = document.querySelector("#titulo-book");
    const AUTOR = document.querySelector("#autor-book");
    const DATA_LANCAMENTO = document.querySelector("#data-lancamento-book");
    const QUANTIDADE_PAGINAS = document.querySelector("#quantidade-paginas-book");
    const DESCRICAO = document.querySelector("#descricao-book");
    const IMAGEM_CAPA = document.querySelector("#imagem-capa-book");
    let resultadoUpdate = document.querySelectorAll(".resposta")[1];
    let title = titulo;
    title = title.toLowerCase().replace(/\s/gi, "-"); // retirando espaços
    title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  
    fetch(
        URL + `/livros`,
        {
            method: "PUT",
            body: JSON.stringify({
                "cod": cod,
                "titulo": TITULO.value,
                "autor": AUTOR.value,
                "data_lancamento": DATA_LANCAMENTO.value,
                "quantidade_paginas": QUANTIDADE_PAGINAS.value,
                "descricao": DESCRICAO.value,
                "imagem_capa": IMAGEM_CAPA.value
            })
        }
    ).then(
        function(response)
        {
            return response.json();
        }
    ).then(
        function(response)
        {
            resultadoUpdate.style.display = "block";
            resultadoUpdate.innerHTML = mensagem(response.status, response.message);
        }
    )
}
function closeForm()
{
    createBookDiv.style.display = "none";
    document.querySelector("#create-popup").style.display = "none";
    document.querySelector("#update-popup").style.display = "none";
}
async function verificaImagem(imagem)
{
    let isThere = false;
    const PREVIEW = document.querySelector("#preview");
    await fetch(imagem).then(
        response => 
        {
            let file = "Arquivo não existe na pasta!";
            if(response.ok)  
                file = `<img src="${imagem}">`;
                isThere = true;
            PREVIEW.innerHTML += file;
        }
    )
    return isThere;
}
function verOpcoes(element)
{
    if(element)
    {
        element.style.display = "flex";
    }
}
function escondeOpcoes(element)
{
    if(element)
    {
        element.style.display = "none";
    }
}
async function createBook()
{
    const TITULO = document.querySelector("#title");
    const AUTOR = document.querySelector("#autor");
    const DATA_LANCAMENTO = document.querySelector("#data-lancamento");
    const QUANTIDADE_PAGINAS = document.querySelector("#quantidade-paginas");
    const DESCRICAO = document.querySelector("#descricao");
    const IMAGEM_CAPA = document.querySelector("#imagem-capa");

    let resultadoCreate = document.querySelectorAll(".resposta")[0]

    if(await verificaImagem(IMAGEM_CAPA) == true)
    {
        fetch(
            URL + "/registerBook",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        "titulo": TITULO.value,
                        "autor": AUTOR.value,
                        "data_lancamento": DATA_LANCAMENTO.value,
                        "quantidade_paginas": QUANTIDADE_PAGINAS.value,
                        "descricao": DESCRICAO.value,
                        "imagem_capa": IMAGEM_CAPA.value
                    }
                )
            }
        ).then(
            function (response)
            {
                return response.json();
            }
        ).then(
            function (response)
            {
                resultadoCreate.style.display = "block";
                resultadoCreate.innerHTML = mensagem(response.status, response.message);
            }
        ).catch(
            function (response)
            {
                console.log(response);
            }
        )
    }
    TITULO.value = "";
    AUTOR.value = "";
    DATA_LANCAMENTO.value = "";
    QUANTIDADE_PAGINAS.value = "";
    DESCRICAO.value = "";
    IMAGEM_CAPA.value = "";
}
function removeBook(cod)
{
    console.log(URL + `/livros/${titulo}`);
    fetch(
        URL + `/livros/${titulo}`,
        {
            method: "DELETE"
        }
    ).then(
        function(response)
        {
            return response.json();
        }
    ).then(
        function(response)
        {
            console.log(response);
            location.reload();
        }
    )
}
async function renderAdmin()
{
    let user = await convertTokenToUser();
    
    if(user && /[0-9]{3}@/.test(user))
    {
        livrosSlider.innerHTML += `
            <div id="adicionar">
                    <p>
                        +
                    </p>
            </div>
        `;
    }
    let divAdicionar = document.querySelector("#adicionar");

    livrosSlider.addEventListener("click", async (element) => {
        console.log(element.target.tagName);
        if(element.target.tagName == "P" && divAdicionar)
        {
            openCreateBookPopUp();
        }
        else if(element.target.tagName == "svg" || element.target.tagName == "path" && divAdicionar)
        {
            let titulo = "";
            let classElement= "";
            if(element.target.tagName == "svg")
            {
                titulo = element.target.parentNode.parentNode.childNodes[3].alt;
                classElement = element.target;
            }
            else
            {
                titulo = element.target.parentNode.parentNode.parentNode.childNodes[3].alt;
                classElement = element.target.parentNode;
            }
            titulo = titulo.toLowerCase().replace(/\s/gi, "-"); // retirando espaços
            titulo = titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // retirando acentos
            let cod = classElement.parentNode.parentNode.lastElementChild.innerText;

            if(classElement.className.baseVal.indexOf("bi-pencil-square") > 0)
            {
                let response = await fetch(
                    URL + `/livros/${titulo}`
                );
                response = await response.json();
                updatePopUp(response[0]);

                btnUpdateBook.addEventListener("click", () => {
                    updateOnBD(cod, titulo);
                });
                return;
            }
            else if(classElement.className.baseVal.indexOf("bi-trash3-fill") > 0){
                if(confirm("Deseja realmente excluir este livro?"))
                {
                    removeBook(element.target);
                    location.reload(true);
                }
            }
        }
        else if(element.target.tagName == "IMG")
        {
            localStorage.setItem("titulo", element.target.alt);
            setTimeout(() => window.location.href = "produto.html", 5);
        }
    })
    livrosSlider.addEventListener("mouseover", (element) => {
        if(element.target.tagName == "IMG" && divAdicionar)
        {
            verOpcoes(element.target.parentNode.firstElementChild);
        }
    });
    livrosSlider.addEventListener("mouseout", (element) => {
        if(element.target.tagName == "IMG" && divAdicionar)
        {
            escondeOpcoes(element.target.parentNode.firstElementChild);   
        }
    });
}

// Event Listenners
btnProx.addEventListener("click", () => proximo());
btnProx.addEventListener("mouseover", () => {
    btnProx.style.opacity = "0.8";
    arrowDireita.style.opacity = "0.8";
});
btnProx.addEventListener("mouseleave", () => {
    btnProx.style.opacity = "0.6";
    arrowDireita.style.opacity = "0";
});
btnVoltar.addEventListener("click", () => voltar());
btnVoltar.addEventListener("mouseover", () => {
    btnVoltar.style.opacity = "0.8";
    arrowEsquerda.style.opacity = "0.8";
});
btnVoltar.addEventListener("mouseleave", () => {
    btnVoltar.style.opacity = "0.6";
    arrowEsquerda.style.opacity = "0";
});
closeCreateBookForm.addEventListener("click", () => {
    closeForm();
});
closeUpdateBookForm.addEventListener("click", () => {
    closeForm();
});
btnCreateBook.addEventListener("click", () => {
    createBook();
});

setTimeout(() => renderAdmin(), 50);