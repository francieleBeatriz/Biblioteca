import { convertTokenToUser } from "./getUser.js";

const INFOS = document.querySelector("#informacoes");
const URL = "http://localhost/api.biblioteca";
const BTN_LOGOUT = document.querySelector("#button-logout");
const BTN_DELETE_ACCOUNT = document.querySelector("#button-delete-account");

async function renderProfile()
{
    let user = await convertTokenToUser();

    if(user)
    {
        document.querySelector("#btn-entrar").innerHTML = `
            <div id="perfil">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
                <a href="profile.html">${user}</a>
            </div>
        `;
        let userInfos = await fetch(
            URL + "/user",
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        )
        userInfos = await userInfos.json();

        INFOS.innerHTML = `
            <div class="info">
                <div class="campos">
                    <h2>Nome:</h2>
                    <input id="nome" value="${userInfos[0].nome}" disabled=""/>
                </div>
                <div class="editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="pen nome" viewBox="0 0 16 16" class="pen">
                        <path class="pen nome" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path class="pen nome" fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
            </div>
            <div class="info">
                <div class="campos">
                    <h2>Email:</h2>
                    <input id="email" value="${userInfos[0].email}" disabled=""/>
                </div>
                <div class="editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="pen email" viewBox="0 0 16 16" class="pen email">
                        <path class="pen email" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path class="pen email" fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
            </div>
            <div class="info">
                <div class="campos">
                    <h2>User:</h2>
                    <input id="usuario" value="${userInfos[0].usuario}" disabled="">
                </div>
                <div class="editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="pen usuario" viewBox="0 0 16 16">
                        <path class="pen usuario" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path class="pen usuario" fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
            </div>
            <div class="info">
                <div class="campos">
                    <h2>Senha:</h2>
                    <input id="senha" type="password" value="${userInfos[0].senha}" disabled="">
                </div>
                <div class="editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="pen senha" viewBox="0 0 16 16">
                        <path class="pen senha" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path class="pen senha" fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </div>
            </div>
        `;
        return;
    }
    window.location.href = "index.html";
}
renderProfile();

BTN_LOGOUT.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Você foi desconectado!");
    window.location.href = "index.html";
});
BTN_DELETE_ACCOUNT.addEventListener("click", async () => {
    
    if(confirm("Deseja realmente excluir sua conta?") == true)
    {
        let response = await fetch(
            URL + "/user",
            {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        )
        response = await response.json();
        console.log(response);
        if(response.status == 200)
        {
            alert(response.message);
        }
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
});

INFOS.addEventListener("click", (element) => {
    if(element.target.className.baseVal && element.target.className.baseVal.indexOf("pen") > -1)
    {
        let campos = {
            "nome": document.querySelector("#nome"),
            "email": document.querySelector("#email"),
            "usuario": document.querySelector("#usuario"),
            "senha": document.querySelector("#senha")
        }

        let classes = element.target.className.baseVal.split(" ");

        campos[classes[1]].removeAttribute("disabled");
        campos[classes[1]].focus();
    }
});

document.addEventListener("keydown", async (e) => {
    if(e.key == "Enter")
    {
        document.querySelector("#nome").setAttribute("disabled", "");
        document.querySelector("#email").setAttribute("disabled", "");
        document.querySelector("#usuario").setAttribute("disabled", "");

        let response = await fetch(
            URL + "/user",
            {
                method: "PUT",
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "nome": document.querySelector("#nome").value,
                    "email": document.querySelector("#email").value,
                    "usuario": document.querySelector("#usuario").value,
                    "senha": document.querySelector("#senha").value
                })
            }
        )
        response = await response.json();
        console.log(response);
    }
});

