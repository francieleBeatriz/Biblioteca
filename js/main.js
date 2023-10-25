import { consultaAPI as consultar } from "./fetch.js";



let barra = document.querySelector("#barra");
let livrosSlider = document.querySelector("#livros-slider");
let btnProx = document.querySelector("#prox");
let btnVoltar = document.querySelector("#voltar");
let arrowDireita = document.querySelector("#iconProximo");
let arrowEsquerda = document.querySelector("#iconVoltar");
let resultados = document.querySelector("#resultados");
let proximoElemento = 4;

// Verificando se o usuário está logado e trocando ENTRAR pelo nick
if(localStorage.getItem("token") != null)
{
    fetch(
        "http://localhost/api.biblioteca/auth",
        {
            method: "GET",
            headers: {
                "Auhorization": localStorage.getItem("token")
            }
        }
    ).then(
        function (response)
        {
            console.log(response);
        }
    ).catch(
        function (response)
        {
            console.log(response);
        }
    )
}

// Event Listenners
barra.addEventListener("input", (element) => pesquisar(element));

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

async function mostrarLivros()
{
    let livros = await consultar(
        "http://localhost/api.biblioteca/livros",
    )
    for(let book in livros)
    {
        livrosSlider.innerHTML += `
        <div class="livro">
            <img src="${livros[book]["imagem_capa"]}" alt="${livros[book]["titulo"]}">
        </div>
        `;
    }
    livrosSlider.innerHTML += `
        <div class="livro" id="adicionar">
            <p>
                +
            </p>
        </div>
    `;
}
mostrarLivros();

async function pesquisar(element)
{
    resultados.innerHTML = ``;
    if(barra.value.length > 3)
    {
        
        let pesquisa = barra.value.toLowerCase().replace(/\s/gi, "-"); // retirando espaços
        pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // retirando acentos

        const livros = await consultar(
            `http://localhost/api.biblioteca/livros/${pesquisa}`,
        );
    
        for(let book in livros)
        {
            resultados.innerHTML += `
                <div class="resultado">
                    <span class="titulo">
                        ${livros[book]["titulo"]}
                    </span>
                    <span class="autor">
                        por ${livros[book]["autor"]}
                    </span>
                    <span class="desc">
                        ${livros[book]["descricao"].substr(0, 61) + "..."}
                    </span>
                </div>
            `;
        }
    }
    
}

function proximo()
{
    if(livrosSlider.scrollLeft == 1219){
        livrosSlider.scrollLeft = 0;
        return;
    }
    livrosSlider.scrollLeft += 610;
}
function voltar()
{
    if(livrosSlider.scrollLeft == 0){
        livrosSlider.scrollLeft = 1219;
        return;
    }
    livrosSlider.scrollLeft += -610;
}
