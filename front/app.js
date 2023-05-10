
const express = require('express');
const app = express();
const fs = require('fs');



function main(){

  app.use(express.static("public"));
  
  app.listen(3000,function(){
      console.log(`exzmple app listening on port ${3000}`);
  });
}

main();
