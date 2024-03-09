const mongooseToSwagger = require('mongoose-to-swagger');
const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    languagen: 'pt-BR',
});

const outputFile = './swagger_output.json';
const endpoitsFiles = ['../index.js', '../src/routes.js'];

//documentação swagger
let doc = {
    info: {
        version: "1.0.0",
        title: "API desafio ttoss",
        description: "Documentação APT ttoss."
    },
    servers: [
        {
            url: "http://localgost:4000/",
            description: "Servidor localhost"
        },
        {
            url: "http://backend-ttoss-versel.app/",
            description: "Servidor de produção"
        }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],

    //table data base
    /*components: {
        Usuario: mongooseToSwagger(EsquemaUsuario),
        Video: mongooseToSwagger(EsquemaVideo),
    }*/
}

//geração da documentação do swagger
swaggerAutogen(outputFile, endpoitsFiles, doc).then(() =>{
    console.log("Documentação Swagger gerada, ver em: "+outputFile)
    
    //verificação do servidor
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
}) 