const cds = require('@sap/cds')
const STATUS = {PENDING: 'Pending',APPROVED: 'Approved'}
const LOG = cds.log('manager-service')
module.exports = cds.service.impl(async function () {
    const { LeaveRequests } = this.entities
    this.on('approveLeave', async req => {
        const { ID } = req.data
        if (!ID) {
            return req.reject(
                400,
                'Leave request ID is required'
            )
        }
        const tx = cds.transaction(req)
        try {
            const leave = await tx.run(
                SELECT.one
                    .from(LeaveRequests)
                    .where({ ID })
            )
            if (!leave) {
                return req.reject(
                    404,
                    'Leave request not found'
                )
            }
            if (leave.status !== STATUS.PENDING) {
                return req.reject(
                    400,
                    'Only pending requests can be approved'
                )
            }
            await tx.run(
                UPDATE(LeaveRequests)
                    .set({
                        status: STATUS.APPROVED
                    })
                    .where({ ID })
            )
            LOG.info(
                `Leave approved by ${req.user.id} for request ${ID}`
            )
            return 'Leave approved successfully'
        } catch (error) {
            LOG.error(
                `Failed to approve leave request ${ID}`,
                error
            )
            return req.reject(
                500,
                'Unable to approve leave request'
            )
        }
    })
})