// Au chargement du document faire les instructions suivantes
addEventListener("DOMContentLoaded",
    async function(){
        // Récupération des variables passées via l'URL
        const id = processUser(); 
        // Chargement du client à modifier
        await load_customers(1, id, 0);
        // Modification des informations
        await listen_modif();
    });

function processUser()
{
    // Récupère ce qu'il y a après le & dans l'URL
    var parameters = location.search.substring(1).split("&");
    // Divise la partie gauche et droite du égal
    var temp = parameters[0].split("=");
    // Récupère la valeur de la variable
    number = decodeURIComponent(temp[1]);
    return number;
}

/**
 * Modification des informations sur le client
 */
async function listen_modif()
{   
    // A l'écoute des clique sur le bouton envoyer
    const modifForm = document.getElementById("modifForm");
    modifForm.addEventListener("submit", function(event){
        console.log("test")
        event.preventDefault();
        // Prépare les données
        const customer = {
            "id" : document.getElementById("id").textContent,
            "first" : document.getElementById("first").value,   
            "email" : document.getElementById("email").value,
            "last" : document.getElementById("last").value,
            "company" : document.getElementById("company").value,
            "country" : document.getElementById("country").value}

        // Modification des données sur le serveur
        modif_customer(customer); 
        alert("Informations envoyées avec succés, le client a été modifié !\nRedirection vers la page d'accueil");
        // Redirection vers la page d'accueil
        window.location.href="index.html";
    });
}


/**
 * Modification sur le serveur des données à modifier via la méthode PUT
 * @param {Client à modifier} customer 
 */
function modif_customer(customer) {
    const url = `http://localhost:3008/api/modifyUser?userId=${customer.id}&email=${customer.email}&first=${customer.first}&last=${customer.last}&company=${customer.company}&country=${customer.country}`;
    $.ajax({
        url: url,
        type: 'PUT',
        success: function(result) {
          console.log('Modification effectuée avec succès!');
          // Redirection vers la page d'accueil
          window.location.href = "index.html";
        },
        error: function(err) {
          console.error('Erreur lors de la modification:', err);
        }
    });
}

