const cds = require('@sap/cds')

module.exports = cds.service.impl(async function () {

    const { LeaveRequests, Holidays } = this.entities

    // Function: checkHoliday
    this.on('checkHoliday', async (req) => {

        const { date } = req.data

        const holiday = await SELECT.one.from(Holidays)
            .where({ holidayDate: date })

        return holiday ? true : false
    })

    // Action: approveLeave
    this.on('approveLeave', async (req) => {

        if (!req.user.is('Manager')) {
            return req.reject(403, 'Only managers can approve leave')
        }
        
        const { ID } = req.data

        const leave = await SELECT.one.from(LeaveRequests)
            .where({ ID })

        if (!leave) {
            return req.error(404, 'Leave request not found')
        }

        if (leave.status === 'Approved') {
            return req.error(400, 'Leave request already approved')
        }

        await UPDATE(LeaveRequests)
            .set({ status: 'Approved' })
            .where({ ID })

        return 'Leave approved successfully'
    })

    // Validation before CREATE
    this.before('CREATE', 'LeaveRequests', async (req) => {

        const { startDate, endDate } = req.data

        if (startDate > endDate) {
            req.error(400, 'Start date cannot be after end date')
        }
    })

    // Function: getWeather
    this.on('getWeather', async (req) => {

        const { city } = req.data

        try {

            const response = await fetch(
                `https://wttr.in/${city}?format=3`
            )

            const data = await response.text()

            return data

        } catch (error) {

            return 'Unable to fetch weather data'
        }
    })

})