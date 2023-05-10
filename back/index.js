const apiServ=require("./presentation/apiPres");
//const consolServ=require("./presentation/consoleapi");

const port=3008;



function main(){
      apiServ.start(port);
    //consolServ.start();

}

main();