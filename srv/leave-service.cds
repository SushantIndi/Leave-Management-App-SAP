using {leave.management as db} from '../db/schema';

service LeaveService {

    entity Employees     as projection on db.Employee;

    entity LeaveRequests as projection on db.LeaveRequest;

    entity Holidays      as projection on db.Holiday;

    function checkHoliday(date: Date) returns Boolean;

    function getWeather(city: String) returns String;

    @requires: 'Manager'
    action   approveLeave(ID: UUID)   returns String;
}
