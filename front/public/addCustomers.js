// Au chargement du document faire ceci
addEventListener("DOMContentLoaded", async function(){
    // Check si le bouton ajouté a été préssé
    const formAddCustomer = document.getElementById("formAddCustomer");
    formAddCustomer.addEventListener("submit", function(event){
        event.preventDefault();
        // Prépare les données
        const customer = {
                        "email" : document.getElementById("email").value,
                        "first" : document.getElementById("first").value,   
                        "last" : document.getElementById("last").value,
                        "company" : document.getElementById("company").value,
                        "country" : document.getElementById("country").value}

        // Ajoute les données
        addCustomer(customer);
        alert("Informations envoyées avec succés, le client a été ajouté à la fin de la liste !\nRedirection vers la page d'accueil");

        // Retour à la page d'accueil
        window.location.href="index.html";
    });
});

/**
 * Utilisation de la méthode POST afin d'ajouter un utilisateur via le back-end
 * @param {client a ajouter} customer 
 * @returns 
 */
function addCustomer(customer) {
    const url="http://localhost:3008/api/customers";
    return new Promise((resolve, reject) => {
        $.post(url, customer)
        .done(function(data){
            resolve(data.result);
        })
        .fail(function(error) {
            reject(new Error(`Une erreur est survenue lors de l'envoie des données': ${error.statusText}`));
        });
    });
}