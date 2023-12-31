const URL = "http://localhost/api.biblioteca";

export async function convertTokenToUser()
{
    let user;
    await fetch(
        URL + "/user",
        {
            method: "POST",
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
            user = response.user;
        }
    ).catch(
        function (response)
        {
            console.log(response.json());
        }
    )
    return user;
}