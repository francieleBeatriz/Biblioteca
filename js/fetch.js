export async function consultaAPI(url, bdy = {}, header = {}, methd = "GET")
{
    let dados;

    await fetch(
        url,
        {
            method: methd,
            headers: header,
        }
    ).then(
        function (response)
        {
            return response.json();
        }
    ).then(
        function (response)
        {
            dados = response;
        }
    ).catch(
        function (response)
        {
            console.log(response);
        }
    )
    return dados;
}
