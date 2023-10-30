let resultados = document.querySelector("#resultados");
let barra = document.querySelector("#barra");

async function pesquisar()
{
    resultados.innerHTML = ``;
    if(barra.value.length > 3)
    {
        
        let pesquisa = barra.value.toLowerCase().replace(/\s/gi, "-"); // retirando espaços
        pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // retirando acentos

        let livros = await fetch(
            `http://localhost/api.biblioteca/livros/${pesquisa}`,
        );
        livros = await livros.json();

        for(let book in livros)
        {
            resultados.innerHTML += `
                <div class="resultado">
                    <span class="titulo">
                        <a href="produto.html">
                            ${livros[book]["titulo"]}
                        </a>
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
barra.addEventListener("input", () => pesquisar());