using { leave.management as db } from '../db/schema';

@requires: 'Manager'
service ManagerService {

    entity LeaveRequests as projection on db.LeaveRequest;

    action approveLeave(
        ID : UUID
    ) returns String;
}