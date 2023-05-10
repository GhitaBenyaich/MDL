/**
 * Check si un bouton supprimé a été cliqué auquel cas on supprime un utilisateur
 * @param {page sur laquelle on se trouve} currentPage 
 */
async function check_del_customer(currentPage){
    // Check si un des boutons supprimé a été cliqué 
    const delButtons = document.querySelectorAll("#delButton");
    for (let i = 0; i < delButtons.length; i++) 
    {
        // Récupération du bouton sur lequel l'utilisateur a cliqué
        const delButton = delButtons[i]; 
        delButton.addEventListener("click", function(event) {
            event.preventDefault();
            /*const customerid = {
                // Calcul de l'id correspondant
                "id" : (i + 1)+ (currentPage*10) -10
            }*/
            const customerid = {
                // Calcul de l'id correspondant
                "id": ((i + 1) + (currentPage * 10) - 10).toString()
            };
            
            del_customer(customerid); // Supprime ce client
        });
    }
}

/**
 * Utilisation de la méthode DELETE afin de supprimer la donnée demandé
 * @param {id du client a supprimé} customerid 
 */
function del_customer(customerid) {
    
    const url = `http://localhost:3008/customers/${customerid.id}`;

    $.ajax({
        url: url,
        type: 'DELETE',
        data: customerid,
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