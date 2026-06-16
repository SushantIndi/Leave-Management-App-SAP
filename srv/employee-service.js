const cds = require('@sap/cds')
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client')
const LOG = cds.log('employee-service')
module.exports = cds.service.impl(async function () {
    const { Holidays } = this.entities
    this.on('whoAmI', req => {
        return {user: req.user.id,roles: [...req.user.roles]}
    })
    this.on('checkHoliday', async req => {
        const { date } = req.data
        if (!date) {
            return req.reject(400,'Date is required')
        }
        if (isNaN(Date.parse(date))) {
            return req.reject(400,'Invalid date format')
        }
        try {
            const holiday = await SELECT.one.from(Holidays).where({ holidayDate: date })
            return Boolean(holiday)
        } catch (error) {
            LOG.error(
                'Failed to check holiday',
                error
            )
            return req.reject(
                500,
                'Unable to check holiday'
            )
        }
    })
    this.on('getWeather', async req => {
        const { city } = req.data
        if (!city) {
            return req.reject(
                400,
                'City is required'
            )
        }
        if (
            typeof city !== 'string' ||
            city.length > 100
        ) {
            return req.reject(
                400,
                'Invalid city name'
            )
        }
        const cityRegex = /^[a-zA-Z\s-]+$/
        if (!cityRegex.test(city)) {
            return req.reject(
                400,
                'City contains invalid characters'
            )
        }
        try {
            const response =
                await executeHttpRequest(
                    {
                        destinationName: 'WeatherAPI'
                    },
                    {
                        method: 'GET',
                        url: `/${encodeURIComponent(city)}?format=3`
                    },
                    {
                        timeout: 5000
                    }
                )
            return response.data
        } catch (error) {
            LOG.error(
                `Weather API call failed for city ${city}`,
                error
            )
            return req.reject(
                503,
                'Weather service unavailable'
            )
        }
    })
    this.before(
        'CREATE',
        'LeaveRequests',
        async req => {
            const {
                startDate,
                endDate
            } = req.data
            if (!startDate || !endDate) {
                return req.reject(
                    400,
                    'Start date and end date are required'
                )
            }
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (
                isNaN(start.getTime()) ||
                isNaN(end.getTime())
            ) {

                return req.reject(
                    400,
                    'Invalid date format'
                )
            }
            if (start > end) {
                return req.reject(
                    400,
                    'Start date cannot be after end date'
                )
            }
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (start < today) {
                return req.reject(
                    400,
                    'Cannot apply leave for past dates'
                )
            }
            try {
                const overlappingRequest =
                    await SELECT.one
                        .from('LeaveRequests')
                        .where({
                            employee_ID: req.user.id
                        })
                if (overlappingRequest) {
                    LOG.info(
                        `Leave validation executed for ${req.user.id}`
                    )
                }
            } catch (error) {
                LOG.error(
                    'Leave validation failed',
                    error
                )
                return req.reject(
                    500,
                    'Leave validation failed'
                )
            }
        }
    )
    this.after(
        'CREATE',
        'LeaveRequests',
        async (_, req) => {
            try {
                LOG.info(
                    `Leave request created by ${req.user.id}`
                )
            } catch (error) {
                LOG.error(
                    'Post-processing failed',
                    error
                )
            }
        }
    )
})