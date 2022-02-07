const express = require('express');
const apiRouter = require('./routes');
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Favágó API",
            version: "1.0.0",
            description: "Favágó Hotel erdészeknek és a természet kedvelőinek.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./server/routes/*.js"]
}
const specs = swaggerJsDoc(options)

const app = express();


app.use(express.json());
app.use('/api/', apiRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))


app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});