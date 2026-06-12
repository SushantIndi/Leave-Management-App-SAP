# 🚀 SAP CAP Leave Management Application

A cloud-native Leave Management System built using **SAP Cloud Application Programming Model (CAP)** and deployed on **SAP Business Technology Platform (SAP BTP) Cloud Foundry**.

This project demonstrates the implementation of a complete enterprise-grade CAP application featuring OData services, business validations, role-based authorization, external API integration, Swagger documentation, and cloud deployment.

---

## 📌 Project Overview

Organizations require a centralized system to manage employee leave requests, approvals, holiday calendars, and leave-related operations.

This application provides:

* Employee Management
* Leave Request Management
* Holiday Management
* Manager Approval Workflow
* Role-Based Security using XSUAA
* Weather Information Integration
* OData V4 APIs
* Swagger API Documentation
* SAP BTP Cloud Deployment

---

## 🏗️ Architecture

```text
┌────────────────────┐
│     SAP BTP        │
│  Cloud Foundry     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   SAP CAP Service  │
│    LeaveService    │
└─────────┬──────────┘
          │
 ┌────────┼─────────┐
 ▼        ▼         ▼
Employees Leaves Holidays
          │
          ▼
 Business Logic
          │
          ▼
 External Weather API
```

---

## ✨ Features

### 👨‍💼 Employee Management

* Store employee information
* Department-based employee records
* Role assignment support

### 📝 Leave Request Management

* Apply for leave
* View leave requests
* Leave status tracking
* Date validation

### 📅 Holiday Management

* Maintain company holiday calendar
* Check whether a specific date is a holiday

### ✅ Manager Approval Workflow

* Approve leave requests
* Role-based authorization
* Manager-only access

### 🌦 Weather Integration

* Fetch real-time weather information
* External API consumption using CAP handlers

### 🔐 Security

* SAP XSUAA Authentication
* Role Templates
* Role Collections
* Authorization using `@requires`

### 📚 API Documentation

* Swagger UI Integration
* OData Metadata Support

---

## 🛠 Technology Stack

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| SAP CAP        | Backend Framework              |
| Node.js        | Runtime                        |
| SQLite         | Development Database           |
| SAP HANA Cloud | Production Database            |
| SAP BTP        | Cloud Platform                 |
| Cloud Foundry  | Deployment Environment         |
| XSUAA          | Authentication & Authorization |
| OData V4       | API Standard                   |
| Swagger UI     | API Documentation              |

---

## 📂 Project Structure

```text
leave_app_cap
│
├── app/
├── db/
│   ├── schema.cds
│   └── data/
│
├── srv/
│   ├── leave-service.cds
│   └── leave-service.js
│
├── mta.yaml
├── xs-security.json
├── package.json
└── README.md
```

---

## 🔐 Security Configuration

The application uses SAP XSUAA for authentication and authorization.

### Roles

| Role     | Access                         |
| -------- | ------------------------------ |
| Employee | View and create leave requests |
| Manager  | Approve leave requests         |

### Protected Action

```cds
@requires: 'Manager'
action approveLeave(ID: UUID) returns String;
```

Only users with the **Manager** role can approve leave requests.

---

## 📡 OData Endpoints

### Employees

```http
GET /odata/v4/leave/Employees
```

### Leave Requests

```http
GET /odata/v4/leave/LeaveRequests
POST /odata/v4/leave/LeaveRequests
```

### Holidays

```http
GET /odata/v4/leave/Holidays
```

### Check Holiday

```http
GET /odata/v4/leave/checkHoliday(date=2026-01-01)
```

### Get Weather

```http
GET /odata/v4/leave/getWeather(city='Bangalore')
```

### Approve Leave

```http
POST /odata/v4/leave/approveLeave
```

---

## 🧠 Business Rules Implemented

### Leave Date Validation

```javascript
if (startDate > endDate) {
    req.error(400, 'Start date cannot be after end date')
}
```

### Holiday Verification

Checks whether a given date exists in the holiday calendar.

### Manager Approval Validation

Only Managers can approve leave requests.

---

## 🚀 Deployment Process

### Build MTAR

```bash
mbt build
```

### Deploy to Cloud Foundry

```bash
cf deploy mta_archives/leave-app-cap_1.0.0.mtar
```

### Check Application Status

```bash
cf apps
```

### View Logs

```bash
cf logs leave-app-cap --recent
```

---

## 📚 Swagger Documentation

After deployment:

```text
https://<application-url>/api-docs
```

Swagger provides an interactive interface for testing and exploring APIs.

---

## 🎯 Learning Outcomes

Through this project, the following SAP BTP concepts were implemented:

* SAP CAP Development
* CDS Data Modeling
* OData V4 Services
* Custom Actions & Functions
* Event Handlers
* External API Integration
* SAP XSUAA Security
* Role-Based Authorization
* SAP HANA Readiness
* Cloud Foundry Deployment
* MTA Packaging
* Swagger Documentation

---

## 👨‍💻 Author

**Sushant Indi**

Electronics & Communication Engineering (ECE)

SAP CAP | SAP BTP | Cloud Foundry | OData | Node.js

---

## ⭐ Future Enhancements

* SAP Fiori Frontend
* Leave Balance Tracking
* Email Notifications
* Multi-Level Approval Workflow
* SAP Work Zone Integration
* SAP HANA Cloud Persistence
* Analytics Dashboard

---

### Built with SAP CAP and SAP BTP ☁️
