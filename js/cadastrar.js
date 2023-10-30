import { mensagem } from "./mensagensFeedback.js";

let btnCadastrar = document.querySelector("#sing-up");

btnCadastrar.addEventListener("click", () => cadastrar())

function cadastrar()
{
    let name = document.querySelector("#nome");
    let email = document.querySelector("#email");
    let user = document.querySelector("#usuario");
    let password = document.querySelector("#senha");
    let passwordConfirm = document.querySelector("#confirmarSenha");
    let msg = document.querySelector("#mensagens");

    fetch(
        "http://localhost/api.biblioteca/register",
        {
            method: "POST",
            body: JSON.stringify({
                "name": name.value,
                "email": email.value,
                "user": user.value,
                "password": password.value,
                "passwordConfirm": passwordConfirm.value
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
            msg.style.display = "flex";
            if(response.status == 200)
            {
                window.location.href = "entrar.html";
            }
            msg.innerHTML = mensagem(response.status, response.message);
        }
    ).catch(
        function (response)
        {
            msg.style.display = "flex";
            msg.innerHTML = mensagem(response.status, "O ocorreu um erro inesperado! Por favor, volte mais tarde!");
        }
    )

    name.value = "";
    email.value = "";
    user.value = "";
    password.value = "";
    passwordConfirm.value = "";
}