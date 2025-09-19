# Job Alert System

A **full-stack microservice-based Job Alert System** designed to deliver real-time job notifications to users based on their preferences.  

---

## 🚀 Overview
The system is built with a **microservices architecture**, where each service handles a dedicated responsibility. Services communicate asynchronously through a **Kafka event pipeline**, ensuring scalability and reliability. Users instantly receive notifications when jobs matching their preferences become available.

---

## 🛠️ Tech Stack
- **Backend Services**
  - Job Search Service → **Python**
  - Job Alert Service → **NestJs**
  - Notification Service → **Firebase**
  - API Gateway → **NestJs**
- **Frontend**
  - Client Application → **Next.js + TypeScript**
- **Messaging**
  - **Kafka** for inter-service communication
- **Database & Storage**
  - (Add your database choice here, e.g., PostgreSQL, MongoDB, Redis)

---

## 🧩 Architecture
1. **Job Search Service (Python)**
   - Scrapes or fetches job listings from external sources.
   - Publishes job events to Kafka.

2. **Job Alert Service (Nestjs)**
   - Consumes job events from Kafka.
   - Matches job listings with user preferences.
   - Publishes matched events to Kafka for notifications.

3. **Notification Service (Firebase)**
   - Listens for matched job alerts.
   - Sends instant push notifications to subscribed users.

4. **API Gateway (Nestjs)**
   - Acts as a single entry point for client requests.
   - Routes requests to appropriate backend services.
   - Handles authentication and authorization.

5. **Client Application (Next.js + TypeScript)**
   - Provides a user-friendly interface for:
     - Job search
     - Subscription management
     - Real-time notifications

---

## 📡 Data Flow
1. Job listings are added through the **Job Search Service**.  
2. Events are published to **Kafka**.  
3. The **Job Alert Service** processes events and matches jobs with user preferences.  
4. Matching alerts are forwarded to **Kafka**.  
5. The **Notification Service** pushes alerts to users via **Firebase**.  
6. The **API Gateway** and **Next.js client** allow user interaction and management.

---

## ⚡ Features
- Real-time job alerts delivered instantly.
- Scalable, event-driven architecture.
- Separate services for modular development and deployment.
- Client-side interface with Next.js for job search and alert management.
- Secure API Gateway for external access.

---

## 📦 Setup & Installation
> ⚠️ This project is microservice-based. Each service runs independently.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-alert-system.git
   cd job-alert-system
