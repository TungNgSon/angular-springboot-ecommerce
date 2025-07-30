# Angular-Spring Boot Ecommerce
**Note:** This project focuses on Spring Security implementation and Stripe integration and does not include a focus on the UI.
> ✅ **This repository is originally forked from [`sinnedpenguin/angular-springboot-ecommerce`](https://github.com/sinnedpenguin/angular-springboot-ecommerce).**  
> ✨ **I have added additional features including real-time event handling via WebSocket and a scheduled job to periodically scan the database.**
## Getting Started

### Prerequisites

- Java 17
- Maven
- Angular
- MySql JDBC Connector
- Stripe Secret Key

**1. Clone the repository:**
```shell
git clone https://github.com/sinnedpenguin/angular-springboot-ecommerce
```

### Angular Frontend
**1. Navigate to the `frontend` directory:**
```shell
cd frontend
```

2. Install dependencies
```shell
npm install
```

### Spring Boot Backend

**1. Navigate to the `backend` directory:**
```shell
cd backend
```

**2. Build the app:**
```shell
mvn clean install
```

## MS SQL Server Database / Stripe
**1. Modify `application.yml`:**
```shell
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: YOUR_DATABASE_CONNECTION_URL
    username: YOUR_DATABASE_USERNAME
    password: YOUR_DATABASE_PASSWORD
  jpa:
    show-sql: true
    properties:
      hibernate.dialect: org.hibernate.dialect.MySQL8Dialect
    hibernate:
      ddl-auto: update
stripe:
  secret-key: YOUR_STRIPE_SECRET_KEY
```

