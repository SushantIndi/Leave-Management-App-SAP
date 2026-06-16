const cds = require('@sap/cds')
const swagger = require('cds-swagger-ui-express')

cds.on('bootstrap', app => {

    app.use(
        swagger()
    )
})

module.exports = cds.server