namespace leave.management;

using { cuid, managed } from '@sap/cds/common';

entity Employee : cuid, managed {

    employeeId  : String(10);
    name        : String(100);
    email       : String(100);
    department  : String(50);
    role        : String(20);

    leaveRequests : Association to many LeaveRequest
        on leaveRequests.employee = $self;
}

entity LeaveRequest : cuid, managed {

    employee    : Association to Employee;

    startDate   : Date;
    endDate     : Date;

    reason      : String(255);

    status      : String enum {
        Pending;
        Approved;
        Rejected;
    } default 'Pending';

}

entity Holiday : cuid, managed {

    holidayDate : Date;
    name        : String(100);
}