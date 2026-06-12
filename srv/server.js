const cds = require('@sap/cds')

cds.on('bootstrap', app => {

    const swaggerUi = require('swagger-ui-express')
    const swaggerDocument = {
        openapi: '3.0.0',
        info: {
            title: 'Leave Management API',
            version: '1.0.0'
        }
    }

    app.use('/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
    )
})

module.exports = cds.server