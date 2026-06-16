namespace leave.management;

using { managed } from '@sap/cds/common';

entity Employee : managed {
    key employeeId : String(10);
    name : String(100);
    email : String(100);
    department : String(50);
    availableLeaves : Integer default 20;
    leaveRequests : Composition of many LeaveRequest
                      on leaveRequests.employee = $self;
}

entity LeaveRequest : managed {
    key ID : UUID;
    employee : Association to Employee;
    startDate : Date;
    endDate : Date;
    reason : String(255);
    status : String enum {
        Pending;
        Approved;
        Rejected;
    } default 'Pending';
}

entity Holiday : managed {
    key holidayDate : Date;
    name : String(100);
}