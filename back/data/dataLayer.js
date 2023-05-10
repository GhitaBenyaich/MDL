const { json } = require("express");
const fs = require("fs");
const _ = require("underscore");
const filename ="./data/customers.json";


const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 130;

let dataLayer = {
    getAllCustomers : function(){
        const data = fs.readFileSync(filename);

        const customers = JSON.parse(data);

        return customers;
    },
    getNextId : function() {
        //read json file
        let rawdata = fs.readFllesync(filename);
        //parse to object
        let customers = json.parse(rawdata);
        //get max id
        const maxId = Math.max.apply(Math,customers.app(filename));
        //return max id + 1;
        return maxId + 1;
    },

    getCustomers : function(number,page){
        {
            let rawdata = fs.readFileSync(filename);
            let customers = JSON.parse(rawdata);
            const total = customers.length;

            if(number && page){
                customers = customers.slice((page-1)*number,page*number);//calcul à revoir
            }

            const result = {
                total : total,
                result : customers
            };

            return result;
        }
    },

 
    addCustomers : function(newCustomer){
        let data = fs.readFileSync(filename, "utf-8");
        let added = JSON.parse(data);
        added.push(newCustomer);

        fs.writeFileSync(filename, JSON.stringify(added), (error) => {
            if(error) throw error;
        });

        return added;

    },   

    modifyUser : function(userId, newEmail, newFirstName, newLastName, newCompany, newCountry) {
        const fileData = fs.readFileSync("../data/customers.json");
        const file = JSON.parse(fileData);

        const data =JSON.stringify(customers);
        fs.writeFileSync(filename, data);
        return data
    } ,
    
   /* delCustomer: function(id) {
        file = JSON.parse(fs.readFileSync(filename, "utf-8"));
        const index = file.find(c => c.id == id);
        console.log(index);
        if (index !== -1) {
            file.splice(index.id - 1, 1); // Supprimer une entrée à l'index spécifié
            const keys = Object.keys(file);
            const length = keys.length;
            console.log(length);
            for (let i = index.id - 1; i < length; i++)
             {
                file[i].id = file[i].id - 1; // Décrémenter l'ID de chaque entrée dans le tableau
              }
            fs.writeFileSync(filename, JSON.stringify(file)); // Écrire les données mises à jour dans le fichier
          }
          return file;
        }*/


        //retire l'user en fonction de son id
    removeUser : function(removeuser){
        //get data from json file
        const rawdata = fs.readFileSync(filename);
        //parse to object
        let newclients = JSON.parse(rawdata);
        //findIndex permet de retrouver un user en fonction du param removeuser
        const id = newclients.findIndex(user => user.id === parseInt(removeuser));
        if (id != -1) {
            //puis de le retirer s'il existe 
            newclients.splice(id, 1);
            //et de reecrire le fichier
            fs.writeFileSync(filename, JSON.stringify(newclients, null, 2));
            return 1;
        } else 
          return 0;        
    }
    


    
};

module.exports = dataLayer;