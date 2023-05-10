// Instructions à faire lors du chargement du document
addEventListener("DOMContentLoaded",
    async function(){
        const number = 10;
        // Afficher la première page
        await load_customers(number, 1, 0);
        // Si on n'est pas sur la page de modification --> afficher la pagination et check des boutons supprimés
        if (window.location.pathname == '/' || window.location.pathname == '/index.html')
        {
            await pagination(number);
            await check_del_customer(1);
        }
    });

/**
 * Charge les clients a affiché
 * @param {Nombre de clients a afficher par pages} numberbypage 
 * @param {Page que l'on veut afficher} page 
 * @param {Condition pour savoir si on check les boutons supprimer (sinon lors du premier chargement il y a double vérification = bug)} condition 
 */
async function load_customers(numberbypage, page, condition) 
{
    // Récupération des données dans le serveur
    const resCustomers = await getCustomer(numberbypage, page);
    // Affichage des données
    disp_table(resCustomers);
    // Check des boutons supprimer ou non
    if(condition != 0)
    {
        console.log("test del customer");
        await check_del_customer(page);
    }
}

/**
 * Utilisation de la méthode GET afin de récupérer les données sur le serveur
 * @param {Nombre de client a afficher par page} numberbypage 
 * @param {Page que l'on veut ajouter} page 
 * @returns 
 */
function getCustomer(numberbypage, page){
    return new Promise((resolve, reject) => {
        const urlApi = "http://localhost:3008/api/customers?number=" + numberbypage + "&page=" + page; 
        $.get( urlApi, {} )
        .done(function( data ) {
            resolve(data);
        })
        .fail(function(error) {
            reject(new Error(`Une erreur est survenue lors de la récupération des données: ${error.statusText}`));
        }); 
    });
}

/**
 * Affichage du tableau de client
 * @param {table a afficher (contient les informations récupérer sur le serveur)} table 
 */
function disp_table(table)
{
    const tbCustomers = document.getElementById("tbCustomers");  
    tbCustomers.innerHTML = "";
    for (const customer of table.result) 
    {
        // Si on est sur la page d'accueil
        if (window.location.pathname == '/index.html' || window.location.pathname == '/')
        {
            const htmlContent = "<tr><td id='id'>" + customer.id +
                            "</td><td>" + customer.last + 
                            "</td><td>" + customer.first + 
                            "</td><td>" + customer.email + 
                            "</td><td>" + customer.company + 
                            "</td><td>" + customer.country + 
                            "</td><td>" + customer.created_at + 
                            "</td><td><a href='modifCustomers.html?number=" + customer.id +"'>Modifier </a>" +
                            "</td><td><button id='delButton'>Supprimer</button>";
            tbCustomers.insertAdjacentHTML('beforeend', htmlContent);
        }
        // Si on est sur la page modification client
        else
        {
            const htmlContent = "<tr><td id='id'>" + customer.id +
                            "</td><td class='modif'><input type='text' id='last' placeholder=" + customer.last + ">" +
                            "</td><td class='modif'><input type='text' id='first' placeholder=" + customer.first + ">" +
                            "</td><td class='modif'><input type='email'id='email' placeholder=" + customer.email + " required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'>" +
                            "</td><td class='modif'><input type='text' id='company' placeholder=" + customer.company + ">" +
                            "</td><td class='modif'><input type='text' id='country' placeholder=" + customer.country + ">" +
                            "</td><td>" + customer.created_at + 
                            "</td><td><form id='modifForm' action='/index.html'><button id='submitButton' type='submit'>Envoyer</button></form></tr>"; // Ajouter la method = post une fois le back configuré
            tbCustomers.insertAdjacentHTML('beforeend', htmlContent);
            // Vérification manuelle des données rentrés car il n'est pas possible d'inclure la balise input dans le form
            check_fields();
            check_email();
        }     
    }
}

/**
 * Vérification manuelle de l'email entrée
 */
function check_email()
{
    const emailInput = document.getElementById("email");
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", function(event) {
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            event.preventDefault();
            alert("Veuillez entrer une adresse e-mail valide");
        }
        });
}

/**
 * Vérification manuelle des données rentrées
 */
function check_fields() {
    const lastInput = document.getElementById("last");
    const firstInput = document.getElementById("first");
    const emailInput = document.getElementById("email");
    const companyInput = document.getElementById("company");
    const countryInput = document.getElementById("country");
    const submitButton = document.getElementById("submitButton");
  
    submitButton.addEventListener("click", function(event) {
      const last = lastInput.value;
      const first = firstInput.value;
      const email = emailInput.value;
      const company = companyInput.value;
      const country = countryInput.value;
  
      if (last === "" || first === "" || email === "" || company === "" || country === "") {
        event.preventDefault();
        alert("Veuillez remplir tous les champs requis");
      }
    });
  }


/**
 * Chargement de la pagination au bas de la page web
 * @param {Nombre de client affichés par page} numberbypage 
 */
async function pagination(numberbypage) {
    // Affichage de la pagination
    const pagination = document.querySelector('.pagination_li');
    display_pagination(pagination, 1, numberbypage);
    // Si l'utilisateur clique sur un nombre de la pagination --> chargement d'une autre page
    pagination.addEventListener("click", async function (event) {
        event.preventDefault();
        // Récupération de la page cliqué
        const page = parseInt(event.target.dataset.page); 
        if (page) 
        {
            try 
            {
                // Chargement et affichage de la page demandé
                load_customers(numberbypage, page, 1);
                display_pagination(pagination, page, numberbypage);
            } 
            catch(error) 
            {
                console.error(error);
            };
        }
    }); 
}

/**
 * Calcul et affichage de la pagination
 * @param {Récupération de l'état de la pagination au moment de l'appel de la fonction} pagination 
 * @param {Récupération de la page actuelle} currentPage 
 * @param {Nombre de clients à afficher} numberbypage 
 */
async function display_pagination(pagination, currentPage, numberbypage){
    // Récupération du nombre total d'éléments à afficher
    total = await getCustomer(10, 1);
    // Calcul du nombre d'onglets à faire
    const totalPages = (total.total+(numberbypage-1))/numberbypage;
    pagination.innerHTML = "";
    // Calcul de pagination
    // Si la page actuelle est supérieur à 10 alors mettre un onglets 10 pages moins loin
    if(currentPage > 10)
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${currentPage-10}"><<</a></li>`;
    else
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${1}"><<</a></li>`;
    // Changement d'id
    const id = document.getElementById('clickable');
    id.id = "newid";
    // Mise en forme
    style_pagination_li(id);
    style_pagination(pagination);
    // Calcul général de la pagination
    for (let i = 1; i <= totalPages; i++) 
    {
        // Onglet de la page actuelle non disponible au clique
        if (i === currentPage) 
        {
            pagination.innerHTML += `<li><span class="nonclickable">${i}</span></li>`;
            style_pagination_li_current(document.querySelector('.nonclickable'));
        }
        // Affichage des trois premiers, trois derniers onglets et les trois onglets autour de la page actuelle
        else if (i <= 3 || i >= totalPages - 2 || (i >= currentPage - 1 && i <= currentPage + 1)) 
        {
            pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${i}">${i} </a></li>`;
            const id = document.getElementById('clickable');
            id.id = "newid";
            style_pagination_li(id);
        } 
        // Résolution d'un bug sur la page 104
        if ((i === 3 && currentPage > 5) || (i === totalPages - 3 && currentPage < totalPages - 4) || (i == currentPage + 2 && i<(totalPages-101)) ) 
        {
            if(currentPage != 104)
                pagination.innerHTML += `<span>...</span>`;
        }
        // Affichage de tout les + 100
        for(let j = 100; j<=(totalPages-100); j = j + 100)
        {
            if ((i >3) && (i === currentPage + j || i === currentPage - j) && i<(totalPages-2)) 
            {
                if(i < (totalPages-103))
                    pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${i}">${i} </a><span>...</span></li>`;
                else
                    pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${i}">${i} </a></li>`;
                const id = document.getElementById('clickable');
                id.id = "newid";
                style_pagination_li(id);
            }
        }
    }
    // Si la page actuelle est inférieur à 10 alors mettre un onglets 10 pages moins loin
    if(currentPage < (totalPages - 10))
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${currentPage+10}">>></a></li>`;
    else
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${totalPages}">>></a></li>`;
    // Changement d'id
    const ids = document.getElementById('clickable');
    ids.id = "newid";
    // Mise en forme de la pagination
    style_pagination_li(ids);
}

// Feuilles de styles

function style_pagination(pagination){
    const style = pagination.style;
    style.display = "flex";
    style.justifyContent = "space-between";
    style.listStyle = "none";
    style.paddingTop = "10px";
    style.paddingBottom = "10px";
    style.paddingLeft = "0px";
    style.borderRadius = "5px";
}

function style_pagination_li_current(pagination_li){
    const style = pagination_li.style; 
    style.padding = "10px";
    style.borderRadius = "5px";
    style.backgroundColor = "#474747";
    style.color = "white";
    style.overflow = "visible";
}

function style_pagination_li(pagination_li){
    const style = pagination_li.style;
    style.border = "1px solid";
    style.padding = "10px";
    style.borderRadius = "5px";
    style.color = "#151515";
    style.textDecoration = "none";
    style.backgroundColor = "white";
    style.marginLeft = "3px";
    style.marginRight = "3px";
}