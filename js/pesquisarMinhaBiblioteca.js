let resultados = document.querySelector("#resultados");
let barra = document.querySelector("#barra");

const URL = "http://localhost/api.biblioteca";

async function pesquisar()
{
    resultados.innerHTML = ``;
    if(barra.value.length > 3)
    {
        
        let pesquisa = barra.value.toLowerCase().replace(/\s/gi, "-"); // retirando espaços
        pesquisa = pesquisa.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // retirando acentos

        let livros = await fetch(
            URL + `/minhaBiblioteca/${pesquisa}`,
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
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
                </div>
            `;
        }

        resultados.addEventListener("click", (element) => {
            if(element.target.tagName == "A")
            {
                localStorage.setItem("titulo", element.target.innerText);
            }
        });
    }
    
}
barra.addEventListener("input", () => pesquisar());