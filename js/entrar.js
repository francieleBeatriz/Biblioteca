import { mensagem } from "./mensagensFeedback.js"; 

let btnEntrar = document.querySelector("#sing-in");

const URL = "http://localhost/api.biblioteca";

btnEntrar.addEventListener("click", () => entrar())

function entrar()
{
    let msg = document.querySelector("#mensagens");

    let user = document.querySelector("#usuario");
    let password = document.querySelector("#senha");

    fetch(
        URL + "/auth",
        {
            method: "POST",
            body: JSON.stringify({
                "user": user.value,
                "password": password.value,
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
            msg.style.display = "block";
            if(response.status == 200)
            {
                localStorage.setItem("token", response.token);
                window.location.href = "index.html";
            }
            user.value = "";
            password.value = "";
            msg.innerHTML = mensagem(response.status, response.message);

        }
    ).catch(
        function (response)
        {
            msg.style.display = "block";
            msg.innerHTML = mensagem(response.stauts, "Ocorreu um erro inesperado! Por favor, tente novamente mais tarde!");
        }
    )

}

