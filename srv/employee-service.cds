using { leave.management as db } from '../db/schema';

@requires: 'Employee'
service EmployeeService {

    @readonly
    entity Employees as projection on db.Employee;

    entity LeaveRequests as projection on db.LeaveRequest;

    @readonly
    entity Holidays as projection on db.Holiday;

    function checkHoliday(
        date : Date
    ) returns Boolean;

    function getWeather(
        city : String
    ) returns String;

    function whoAmI()
        returns String;
}