<!--[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/DIHvCS29)-->

# FixFinder

## Project Description

FixFinder is a fully web-based platform that connects end users with local service providers across a range of services, including electricians, handymen, and other skilled professionals. The application supports two distinct user roles:

- **End Users**: End users can search for nearby service providers based on their specific requirements and location. They can view detailed provider profiles, specify required service hours, book services, and efficiently manage their bookings through a personalized dashboard.

- **Service Providers**: Service providers can manage their offerings, set pricing, and utilize a dashboard to gain insights into their revenue and performance.

FixFinder aims to streamline service discovery and booking through a user-friendly interface. End users can effortlessly search for nearby service providers based on their specific requirements, view detailed provider profiles, specify service hours, and manage bookings through a personalized dashboard. Service providers, on the other hand, can efficiently manage their offerings, set competitive pricing, and leverage a dedicated dashboard to monitor their performance, bookings, and revenue insights. FixFinder bridges the gap between users and providers, ensuring a seamless experience for both parties.

## Tech Stack

| Technology                                                                                                                      | Description                                              |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                             | Front-end framework for building user interfaces         |
| ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)                              | State management for handling complex application state  |
| ![Node.js](https://img.shields.io/badge/Node-FFFFFF?style=for-the-badge&logo=tsnode)                                            | Backend server framework for RESTful API development     |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)                        | NoSQL database for data persistence                      |
| ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=black&labelColor=white) | Middleware for handling server requests and APIs         |
| ![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)                                    | Progressive Web App for offline and mobile compatibility |
| ![Internationalization](https://img.shields.io/badge/multilingual-007ACC?style=for-the-badge)                                   | Multilingual support for global users                    |

---

## Project Requirements & Features

- **CRUD Operations**: Full create, read, update, and delete functionality.
- **Routing & State Management**: Uses routing for multiple pages and Redux for global state management.
- **Internationalization**: Supports multiple languages for a wider audience.
- **PWA (Progressive Web App)**: Ensures downlaod feature and offline access.
- **Domain Driven Design (DDD)**: The REST API follows best practices for design and RESTful principles outlined by Microsoft’s guidelines on [API Design Best Practices](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design).
- **Component Structure**: Follows a modular approach with small, reusable components for maintainability.
- **Professional UI**: Focus on UX and professional design standards.
- **Fugu Capabilities**: Integration of advanced web app features to enhance functionality.

---

## Repository Structure

The project repository will include two primary directories:

1. **app**: Frontend code (React, Redux, SCSS).
2. **service**: Directory for REST API Service | Server-side code with configurations (Node.js, Express.js, MongoDB).

Other Contents:

- **Presentation PPT**: Project Title, Project Description, Team member names, Screenshots from the project

---

## Installation Guide

1. Clone the repository

```bash
git clone https://github.com/info-6150-fall-2024/final-project-syntaxsquad.git
```

## Object Model Using Domain Driven Design for FixFinder Application

```mermaid
---
title: Application Model

---
  classDiagram
    class User {
        +int userId
        +string firstName
        +string lastName
        +string address
        +string email
        +string phoneNumber
        +BookService()
    }

    class ServiceProvider {
        +int id
        +string firstName
        +string lastName
        +Service serviceType
        +float hourlyRate
        +string address
        +string email
        +string phoneNumber
        +ListService()
    }

    class Service {
        +int id
        +string description
        +float price
        +AddToBooking()
    }

    class Booking {
        +int id
        +date bookingDate
        +string bookingTime
        +float totalCost
        +User user
        +ServiceProvider serviceProvider
        +Service service
        +string status
        +MakePayment()
    }

    class Payment {
        +int id
        +float amount
        +date paymentDate
        +string paymentStatus
        +int bookingId
        +ProcessPayment()
    }

    %% Relationships
    User "1" *-- "0..*" Booking : makes
    ServiceProvider "1" *-- "0..*" Booking : available_for
    ServiceProvider "1" *-- "0..*" Service : offers
    Service "1" *-- "0..*" Booking : included_in
    Booking "1" -- "1" Payment : associated_with

```
