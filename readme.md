# 🚀 SAP CAP Leave Management System

<div align="center">

![SAP](https://img.shields.io/badge/SAP-BTP-blue?style=for-the-badge)
![CAP](https://img.shields.io/badge/SAP-CAP-success?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-green?style=for-the-badge)
![Cloud Foundry](https://img.shields.io/badge/Cloud-Foundry-orange?style=for-the-badge)
![SAP HANA Cloud](https://img.shields.io/badge/SAP-HANA%20Cloud-blueviolet?style=for-the-badge)
![OData](https://img.shields.io/badge/OData-V4-blue?style=for-the-badge)

### Enterprise Leave Management Application built with SAP CAP and SAP BTP

A cloud-native Leave Management System developed using the **SAP Cloud Application Programming Model (CAP)** and deployed on **SAP Business Technology Platform (SAP BTP) Cloud Foundry** with **SAP HANA Cloud**, **XSUAA Security**, **Destination Service**, and **Role-Based Authorization**.

</div>

---

# 📌 Project Overview

Organizations require a centralized solution to manage employee leave requests, approvals, holiday calendars, and employee workflows.

This project demonstrates a complete enterprise-grade SAP CAP application featuring:

✅ Employee Leave Management

✅ Manager Approval Workflow

✅ Holiday Management

✅ SAP HANA Cloud Integration

✅ External API Consumption

✅ SAP Destination Service

✅ Role-Based Authorization

✅ XSUAA Authentication

✅ Cloud Foundry Deployment

✅ Swagger API Documentation

✅ SAP BTP Administration

---

# 🏗️ Enterprise Architecture

flowchart TD
    BAS[Business Application Studio]
    CAP[CAP Application]
    AR[Approuter]
    XSUAA[XSUAA]

    BAS --> CAP
    CAP --> AR
    AR --> XSUAA

    EMP[EmployeeService]
    MGR[ManagerService]

    XSUAA --> EMP
    XSUAA --> MGR

    HANA[SAP HANA Cloud]
    EMP --> HANA
    MGR --> HANA

    DEST[Destination Service]
    API[External Weather API]

    HANA --> DEST
    DEST --> API
    
  ---

# ✨ Features

## 👨‍💼 Employee Management

* View employee records
* Department-based employee data
* Role-based access control

## 📝 Leave Request Management

* Apply for leave
* Track leave status
* Leave validation rules
* Prevent invalid requests

## 📅 Holiday Management

* Company holiday calendar
* Holiday lookup functionality

## ✅ Manager Approval Workflow

* Approve leave requests
* Pending request validation
* Manager-only authorization

## 🌦 Weather Integration

* Real-time weather information
* External API integration
* SAP Destination Service usage

## 🔐 Security

* SAP XSUAA Authentication
* Role Templates
* Role Collections
* Authorization using `@requires`

## 📚 API Documentation

* Swagger UI Integration
* OData V4 Services
* Metadata Support

---

# ☁️ SAP BTP Services Used

| Service                         | Purpose                        |
| ------------------------------- | ------------------------------ |
| SAP HANA Cloud                  | Production Database            |
| HDI Container                   | Database Deployment            |
| Cloud Foundry                   | Runtime Environment            |
| SAP Business Application Studio | Development Environment        |
| XSUAA                           | Authentication & Authorization |
| Destination Service             | External API Connectivity      |
| Cloud Identity Services         | Identity Management            |
| Application Router              | Secure Application Access      |

---

# 🏢 SAP BTP Cockpit Configuration

## Subaccount Administration

* Created SAP BTP Trial Subaccount
* Managed Service Subscriptions
* Configured Cloud Foundry Environment
* Configured Security Settings

## Cloud Foundry

* Created and managed Spaces
* Managed Space Quotas
* Application Deployment
* Service Binding Configuration
* Runtime Monitoring

## Destination Service

Configured destination:

Destination Name : WeatherAPI
Type             : HTTP
Proxy Type       : Internet

Used for secure external API communication.

## Security Administration

Configured:

* Role Templates
* Role Collections
* User Assignments
* Authorization Testing

---

# 🔐 Security & Authorization

## Employee Service

@requires: 'Employee'
service EmployeeService

## Manager Service

@requires: 'Manager'
service ManagerService

### Role Collections

| Role Collection | Purpose                   |
| --------------- | ------------------------- |
| LeaveEmployee   | Employee Access           |
| LeaveManager    | Employee + Manager Access |

### Role Templates

| Role Template | Description                 |
| ------------- | --------------------------- |
| Employee      | Employee Operations         |
| Manager       | Manager Approval Operations |

---

# 🗄️ SAP HANA Cloud Integration

This project was designed for SAP HANA Cloud deployment.

Implemented:

* SAP HANA Cloud Instance
* HDI Container
* CAP Persistence Layer
* Database Artifact Deployment
* Service Binding

### Database Entities

Employee
LeaveRequest
Holiday

---

# 📡 OData Services

## Employee Service

### Employees

GET /odata/v4/employee/Employees

### Leave Requests

GET /odata/v4/employee/LeaveRequests
POST /odata/v4/employee/LeaveRequests

### Holidays

GET /odata/v4/employee/Holidays

### Check Holiday

GET /odata/v4/employee/checkHoliday(date='2026-01-01')

### Get Weather

GET /odata/v4/employee/getWeather(city='Bangalore')

### Current User

GET /odata/v4/employee/whoAmI()

---

## Manager Service

### Approve Leave

POST /odata/v4/manager/approveLeave

---

# 🌐 External API Integration

Weather information is retrieved using:

* SAP Destination Service
* SAP Cloud SDK
* HTTP Destination Configuration

Flow:

CAP Service
     │
     ▼
Destination Service
     │
     ▼
Weather API
     │
     ▼
Response Returned

---

# 🧠 Business Rules Implemented

## Leave Date Validation

✔ Start Date Required

✔ End Date Required

✔ Start Date Cannot Exceed End Date

✔ No Past Date Leave Requests

✔ Invalid Date Format Prevention

### Validation Example
if (start > end) {
   req.reject(
      400,
      'Start date cannot be after end date'
   )
}

---

## Holiday Validation

checkHoliday(date)

Checks whether the provided date exists in the holiday calendar.

---

## Manager Approval Validation

Only pending requests can be approved.

if (leave.status !== 'Pending')

---

## User Context Validation

req.user.id
req.user.roles

Used for authorization and auditing.

---

# 📂 Project Structure

leave-management-app
│
├── app
│   └── router
│       └── xs-app.json
│
├── db
│   ├── schema.cds
│   └── data
│
├── srv
│   ├── employee-service.cds
│   ├── employee-service.js
│   ├── manager-service.cds
│   ├── manager-service.js
│   └── server.js
│
├── mta.yaml
├── xs-security.json
├── package.json
├── test.http
└── README.md

---

# 🛠️ Technology Stack

| Technology     | Purpose                  |
| -------------- | ------------------------ |
| SAP CAP        | Backend Framework        |
| Node.js        | Runtime                  |
| CDS            | Data Modeling            |
| SQLite         | Development Database     |
| SAP HANA Cloud | Production Database      |
| HDI Container  | Database Deployment      |
| SAP BTP        | Cloud Platform           |
| Cloud Foundry  | Deployment Environment   |
| XSUAA          | Authentication           |
| SAP Cloud SDK  | External API Consumption |
| OData V4       | Service Layer            |
| Swagger UI     | API Documentation        |
| Approuter      | Secure Routing           |

---

# 🚀 Deployment

## Build MTAR

mbt build

## Deploy to Cloud Foundry

cf deploy mta_archives/<application>.mtar

## Check Applications

cf apps

## View Logs

cf logs <application-name> --recent

---

# 📚 Swagger Documentation

After deployment:

https://<application-url>/api-docs

Provides interactive API testing and documentation.

---

# 🎯 Learning Outcomes

Through this project, the following SAP technologies and concepts were implemented:

### SAP CAP

* CDS Data Modeling
* Service Projections
* OData V4
* Custom Functions
* Custom Actions
* Event Handlers

### SAP Security

* XSUAA Authentication
* Role Templates
* Role Collections
* User Authorization
* Access Control

### SAP HANA

* SAP HANA Cloud
* HDI Containers
* Service Bindings
* Database Deployment

### SAP BTP Administration

* Destination Configuration
* Cloud Foundry Spaces
* Service Subscriptions
* User Management
* Role Assignment
* Runtime Monitoring

### Integration

* SAP Cloud SDK
* REST API Consumption
* Destination Service Connectivity

---

# 🌟 Key Highlights

✅ SAP CAP Development

✅ SAP BTP Administration

✅ SAP HANA Cloud

✅ HDI Containers

✅ Cloud Foundry Deployment

✅ XSUAA Security

✅ Destination Service

✅ Role Collections

✅ Application Router

✅ External API Integration

✅ Swagger Documentation

---

# 🔮 Future Enhancements

* SAP Fiori Frontend
* Leave Balance Tracking
* Email Notifications
* Multi-Level Approval Workflow
* SAP Work Zone Integration
* Analytics Dashboard
* SAP Build Apps Integration

---

# 👨‍💻 Author

### Sushant Indi

Electronics & Communication Engineering (ECE)

**SAP CAP | SAP BTP | SAP HANA Cloud | Cloud Foundry | Node.js | OData | XSUAA**

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

### Built with SAP CAP & SAP BTP ☁️

</div>
