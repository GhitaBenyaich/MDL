const chalk = require('chalk');
let readlineSync = require('readline-sync');
const business = require('../business/business');

let i, id, email, first, last, company, company1, created, country, country1, user, users, input;

const consolePres = {
    start: function () {

        // Function to fetch data
        function getData() {
            users = business.getCustomers();
        }

        // Function to print the menu options
        function printQst() {
            console.log(chalk.red("                    Menu : \n"));
            console.log(chalk.blue(" -1- Ajouter un utilisateur"));
            console.log(chalk.blue(" -2- Retirer un utilisateur "));
            console.log(chalk.blue(" -3- Modifier un utilisateur \n"));
            
            input = readlineSync.question(chalk.yellow('Quel est votre choix ? \n'));
        }

        // Function to add a user
        function addUser() {
            id = readlineSync.question(chalk.green('Quel est l`id ? \n')); 
            email = readlineSync.question(chalk.green('Quel est l`email ? \n'));
            first = readlineSync.question(chalk.green('Quel est le prenom ? \n'));
            last = readlineSync.question(chalk.green('Quel est le nom? \n'));
            company1 = readlineSync.question(chalk.green('Quel est le nom de la société ? \n'));
            created = readlineSync.question(chalk.green('Quand a elle été créee ? \n'));
            country1 = readlineSync.question(chalk.green('Quel est en est le pays ? \n'));

            user = {
                id: id,
                email: email,
                first: first,
                last: last,
                company: company1,
                created_at: created,
                country: country1
            };

            business.addCustomers(user);
        }

        // Function to update a user
        function updateUser() {
            id = readlineSync.question(chalk.green('Quel est l`id ? \n')); 
            email = readlineSync.question(chalk.green('Quel est l`email ? \n'));
            first = readlineSync.question(chalk.green('Quel est le prenom ? \n'));
            last = readlineSync.question(chalk.green('Quel est le nom? \n'));
            company1 = readlineSync.question(chalk.green('Quel est le nom de la société ? \n'));
            created = readlineSync.question(chalk.green('Quand a elle été créee ? \n'));
            country1 = readlineSync.question(chalk.green('Quel est en est le pays ? \n'));

            user = {
                id: id,
                email: email,
                first: first,
                last: last,
                company: company1,
                created_at: created,
                country: country1
            };

            business.modifyUser(id, email, first, last, company1, country1);
        }

        // Function to remove a user
        function removeUser(){
            id = readlineSync.question(chalk.green('Quel est l`id ? \n')); 
            business.removeUser(id);
        }

        // Function to handle different cases based on user input
        function cases(input) {
            if (input === '1') {
                addUser();
            } else if (input === '2') {
                removeUser();
            } else if (input === '3') {
                updateUser();
            } 
        }

        // Main function to orchestrate the program
        function main() {
            getData(); // Fetch data
            printQst(); // Print menu options
            cases(input); // Handle user input
        }


        main();

    }
};

module.exports = consolePres;

        
         
        

       

       
        