const express = require("express"); //initialisation module express
const { Deletecustomer } = require("../business/business");
const app = express(); //initalisation de l'application web
const cors = require('cors');

const business = require("../business/business");
var bodyParser = require('body-parser')

const apiServ ={

    start: function(port){
        app.use(express.json());

        // Configure CORS middleware
        app.use(cors());

        app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        app.use(bodyParser.json())
        
        app.use(function(req, res, next) {  
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        
        //donner tous les clients
        app.get("/api/customers", function(req,res){
            const number = req.query.number;
            const page = req.query.page;
            const resCustomers = business.getCustomers(number,page);
            res.json(resCustomers);  
        });


        /*app.post("/api/Addcustomers", function(req,res){
            console.log("test")
            console.log(req.body);
            const email = req.body["user[email]"];
            const firstname = req.body["user[firstname]"];
            const lastname = req.body["user[lastname]"];
            const company = req.body["user[company]"];
            const country = req.body["user[country]"];
            const resCustomers = business.addcustomers(firstname, lastname, email,company,country);
            console.log(resCustomers);
            res.json(resCustomers);  
        });*/
         
        app.post("/api/customers", function(req, res) {
          const total = business.getCustomers();
          let id = total.total + 1;
          var d = new Date();
          var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
          var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
          var fullDate = date+' '+hours;
          const newCustomer ={
            id : id,
            email : req.body.email,
            first : req.body.first,
            last : req.body.last,
            company : req.body.company,
            created_at : fullDate,
            country : req.body.country
        }

          res = business.addCustomers(newCustomer);

      });

       

       
          app.put("/api/modifyUser", async function(req, res) {
            const userId = req.query.userId;
            const email = req.query.email;
            const first = req.query.first;
            const last = req.query.last;
            const company = req.query.company;
            const country = req.query.country;

            try {
              const resCustomers = await business.modifyUser(userId, email, first, last, company, country);
              res.json(resCustomers);
            } catch (err) {
              console.error(err);
              res.status(500).send("Une erreur est survenue lors de la modification du client");
            }
          });
          
          

          app.delete('/customers/:id', async (req, res) => {
            try {
              let id = req.params.id;
          
              // Check if id is not a string, then convert it to a string
              if (typeof id !== 'string') {
                id = id.toString();
              }
          
              console.log(`Deleting customer ${id}`);
          
              // Call the deleteCustomer function to delete the customer
              let result = await business.deleteCustomer(id);
                        
              if (result) {
                res.status(200).send(`Customer ${id} has been deleted.`);
              } else {
                res.status(404).send(`Customer ${id} not found.`);
              }
            } catch (error) {
              console.error(error);
              res.status(500).send('Internal server error.');
            }
          });
          

        app.listen(port, function(){
            console.log("Server running on port "+ port);
        });

    }
};
module.exports = apiServ;