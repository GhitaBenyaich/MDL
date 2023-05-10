const dal = require("../data/dataLayer");
const fs = require('fs');
const _ = require("underscore");

const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 130;

const business = {
    getAllCustomers: function(){
        return dal.getAllCustomers();
    },


    getCustomers : function(number, page){
        //vérifier les paramètres
        
        if(number === undefined || page === undefined){
            number = defaultNumber;
            page = defaultPage;
        }

        if(number>defaultNumber){
            number = maxNumber;
        }

        const resCustomers = dal.getCustomers(number,page);
        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total/number);

        return resCustomers;
    },
   
    addCustomers : function(customer){
      return dal.addCustomers(customer);;
  },

  delCustomer : function(customer){
    return dal.delCustomer(customer);;
},
    
   

modifyUser: function(userId, email, first, last, company, country) {
    return new Promise((resolve, reject) => {
      fs.readFile("./data/customers.json", "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }
  
        let customers = JSON.parse(data);
        let index = customers.findIndex(customer => customer.id === parseInt(userId));
        const customer = customers.find(c => c.id == userId);
        if (!customer) {
          reject(`Le client avec l'ID ${userId} n'existe pas`);
          return;
        }
  
        customer.email = email;
        customer.first = first;
        customer.last = last;
        customer.company = company;
        customer.country = country;
  
        fs.writeFile("./data/customers.json", JSON.stringify(customers), err => {
          if (err) {
            reject(err);
            return;
          }
  
          resolve(customers);
        });
      });
    });
  },
  

deleteCustomer: async function(id) {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/customers.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
  
        let customers = JSON.parse(data);
        //let index = customers.findIndex(customer => customer.id === parseInt(id));

       // let index = customers.findIndex(customer => customer.id === id);
  
        if (id !== -1) {
          customers.splice(id-1, 1);
        for(let i=id+1 ; i<customers.length ; i++){
            customers[i].id--;
          }
  
          fs.writeFile('./data/customers.json', JSON.stringify(customers), err => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(true);
            }
          });
        } else {
          reject(`Customer ${id} not found`);
        }
      });
    });
  },

  removeUser : function(user){
    let nb = dal.removeUser(user);
    if(nb) return { success: true, message: "Utilisateur supprimé avec succès." };
    else return { success: false, message: "ID d'utilisateur non trouvé." };
}

  


};
  
  
module.exports = business;