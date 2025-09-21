# Vendor Management System

A comprehensive vendor and service management system built with Spring Boot, H2 Database, and modern web technologies.

## Features

- **Vendor Management**: Complete CRUD operations for vendors with contact information and status tracking
- **Service Management**: Manage vendor contracts/services with expiry and payment tracking
- **JWT Authentication**: Secure API access with token-based authentication
- **Auto Notifications**: Automated email reminders for expiring services and payment due dates
- **Responsive UI**: Modern web interface with jQuery and CSS
- **Pagination**: Efficient data browsing with pagination support
- **Real-time Alerts**: Visual indicators for services requiring attention

## Technology Stack

- **Backend**: Spring Boot 3.1.5, Spring Security, Spring Data JPA
- **Database**: H2 (In-memory for development)
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: HTML5, CSS3, jQuery 3.6.0
- **Email**: Spring Mail with SMTP support
- **Build Tool**: Maven

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Modern web browser

# Vendor Management System - Setup Instructions
## Prerequisites
Before setting up the Vendor Management System, ensure you have the following installed:
- **Java 17** or higher
- **Gradle 7.0** or higher (or use the included Gradle wrapper)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Git** (for cloning the repository)

## 1. Clone the Repository
``` bash
git clone <repository-url>
cd vendor-management-system
```
## 2. Project Structure Verification
Ensure your project structure looks like this:
``` 
vendor-management-system/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── build.gradle
├── gradlew
├── gradlew.bat
└── README.md
```
## 3. Configure Application Properties
Create with the following configuration: `src/main/resources/application.properties`
``` properties
# Server Configuration
server.port=8080

# Database Configuration (H2 In-Memory)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console Configuration (Development Only)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.h2.console.settings.web-allow-others=false

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=myVendorManagementSecretKey2024
jwt.expiration=86400000

# Email Configuration (Optional - for notifications)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=3000
spring.mail.properties.mail.smtp.writetimeout=5000

# Logging Configuration
logging.level.com.vendormanagement=DEBUG
logging.level.org.springframework.security=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
```
## 4. Build the Application
### Using Gradle Wrapper (Recommended)
**On Linux/macOS:**
``` bash
./gradlew build
```
**On Windows:**
``` cmd
gradlew.bat build
```
### Using System Gradle
``` bash
gradle build
```
## 5. Run the Application
### Method 1: Using Gradle Wrapper
``` bash
./gradlew bootRun
```
### Method 2: Using JAR File
``` bash
./gradlew build
java -jar build/libs/vendor-management-system-0.0.1-SNAPSHOT.jar
```
### Method 3: Using IDE
- Open the project in IntelliJ IDEA or Eclipse
- Run the main application class (typically ) `VendorManagementApplication.java`

## 6. Verify Installation
Once the application starts successfully, you should see output similar to:
``` 
2024-10-06 10:30:00 - Starting VendorManagementApplication
2024-10-06 10:30:02 - Tomcat initialized with port(s): 8080 (http)
2024-10-06 10:30:03 - Started VendorManagementApplication in 3.456 seconds
```
## 7. Access the Application
### Web Application
- **Main Application**: [http://localhost:8080](http://localhost:8080)
- **Login Page**: [http://localhost:8080/login.html](http://localhost:8080/login.html)
- **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

### H2 Database Console Settings
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

### API Endpoints
- **Base API URL**: [http://localhost:8080/api](http://localhost:8080/api)
- **Health Check**: [http://localhost:8080/hello](http://localhost:8080/hello)

## 8. Initial Setup and Testing
### Step 1: Test Health Check
``` bash
curl http://localhost:8080/hello
```
Expected response: `"Hello World"`
### Step 2: Register Initial User
``` bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "password123",
    "role": "ADMIN"
  }'
```
### Step 3: Login and Get Token
``` bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```
Save the returned JWT token for subsequent API calls.
### Step 4: Test Vendor Creation
``` bash
curl -X POST http://localhost:8080/api/vendors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "name": "Tech Solutions Inc",
    "contactPerson": "John Doe",
    "email": "john@techsolutions.com",
    "phone": "+1-555-0123",
    "status": "ACTIVE"
  }'
```
## 9. Development Configuration
### IDE Setup (IntelliJ IDEA)
1. Open the project in IntelliJ IDEA
2. Ensure Project SDK is set to Java 17+
3. Enable annotation processing
4. Install Lombok plugin (if using Lombok)

### Hot Reload Configuration
Add to for development: `application.properties`
``` properties
spring.devtools.restart.enabled=true
spring.devtools.livereload.enabled=true
```
Add dependency to : `build.gradle`
``` groovy
developmentOnly 'org.springframework.boot:spring-boot-devtools'
```
## 10. Production Configuration
### Database Configuration
For production, replace H2 with a persistent database:
**PostgreSQL Example:**
``` properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vendor_management
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```
Add PostgreSQL dependency to : `build.gradle`
``` groovy
runtimeOnly 'org.postgresql:postgresql'
```
### Security Configuration
``` properties
# Disable H2 Console in production
spring.h2.console.enabled=false

# Use environment variables for sensitive data
jwt.secret=${JWT_SECRET:defaultSecretKey}
spring.mail.username=${MAIL_USERNAME:}
spring.mail.password=${MAIL_PASSWORD:}
```
## 11. Troubleshooting
### Common Issues
**Port 8080 already in use:**
``` properties
server.port=8081
```
**Java version issues:**
``` bash
java -version  # Check Java version
export JAVA_HOME=/path/to/java17  # Set correct Java version
```
**Build failures:**
``` bash
./gradlew clean build  # Clean and rebuild
```
**Permission denied (Linux/macOS):**
``` bash
chmod +x gradlew
```
### Log Files
Check application logs for detailed error information:
- Console output during startup
- Application logs (if configured)
- Check `build/` directory for build-related issues

## 12. Next Steps
After successful setup:
1. Access the web interface at [http://localhost:8080](http://localhost:8080)
2. Create vendors and services through the UI
3. Test API endpoints using the provided documentation
4. Set up email notifications (optional)
5. Configure production database for persistent data


# Vendor Management System - API Documentation
## Base URL
``` 
http://localhost:8080/api
```
## Authentication
All endpoints except authentication endpoints require a JWT token in the Authorization header:
``` 
Authorization: Bearer <your-jwt-token>
```
## 1. Authentication Endpoints
### POST /api/auth/login
Authenticate user and receive JWT token.
**Request:**
``` json
{
  "username": "admin",
  "password": "password123"
}
```
**Response (200 OK):**
``` json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNDU2Nzg5MCwiZXhwIjoxNjM0NjU0MjkwfQ.signature"
}
```
**Response (400 Bad Request):**
``` json
"Invalid credentials"
```
### POST /api/auth/register
Register a new user account.
**Request:**
``` json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"
}
```
**Response (200 OK):**
``` json
"User registered successfully"
```
**Response (400 Bad Request):**
``` json
"Username already exists"
```
## 2. Vendor Management Endpoints
### GET /api/vendors
Retrieve all vendors with pagination support.
**Query Parameters:**
- `page` (optional): Page number, starting from 0 (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Request Example:**
``` http
GET /api/vendors?page=0&size=10
Authorization: Bearer <token>
```
**Response (200 OK):**
``` json
{
  "content": [
    {
      "id": 1,
      "name": "Tech Solutions Inc",
      "contactPerson": "John Doe",
      "email": "john@techsolutions.com",
      "phone": "+1-555-0123",
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "name": "Digital Services Ltd",
      "contactPerson": "Jane Smith",
      "email": "jane@digitalservices.com",
      "phone": "+1-555-0456",
      "status": "ACTIVE"
    }
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true
    },
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 2,
  "totalPages": 1,
  "last": true,
  "first": true,
  "number": 0,
  "size": 10
}
```
### GET /api/vendors/{id}
Retrieve a specific vendor by ID.
**Request Example:**
``` http
GET /api/vendors/1
Authorization: Bearer <token>
```
**Response (200 OK):**
``` json
{
  "id": 1,
  "name": "Tech Solutions Inc",
  "contactPerson": "John Doe",
  "email": "john@techsolutions.com",
  "phone": "+1-555-0123",
  "status": "ACTIVE"
}
```
**Response (404 Not Found):**
``` json
{
  "message": "Vendor not found with id: 1"
}
```
### POST /api/vendors
Create a new vendor.
**Request:**
``` json
{
  "name": "New Tech Company",
  "contactPerson": "Alice Johnson",
  "email": "alice@newtech.com",
  "phone": "+1-555-0789",
  "status": "ACTIVE"
}
```
**Response (201 Created):**
``` json
{
  "id": 3,
  "name": "New Tech Company",
  "contactPerson": "Alice Johnson",
  "email": "alice@newtech.com",
  "phone": "+1-555-0789",
  "status": "ACTIVE"
}
```
**Response (400 Bad Request):**
``` json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```
### PUT /api/vendors/{id}
Update an existing vendor.
**Request:**
``` json
{
  "name": "Tech Solutions Inc - Updated",
  "contactPerson": "John Doe",
  "email": "john.doe@techsolutions.com",
  "phone": "+1-555-0123",
  "status": "ACTIVE"
}
```
**Response (200 OK):**
``` json
{
  "id": 1,
  "name": "Tech Solutions Inc - Updated",
  "contactPerson": "John Doe",
  "email": "john.doe@techsolutions.com",
  "phone": "+1-555-0123",
  "status": "ACTIVE"
}
```
### DELETE /api/vendors/{id}
Delete a vendor by ID.
**Request Example:**
``` http
DELETE /api/vendors/1
Authorization: Bearer <token>
```
**Response (204 No Content)**
**Response (404 Not Found):**
``` json
{
  "message": "Vendor not found with id: 1"
}
```
## 3. Service Management Endpoints
### GET /api/services
Retrieve all services with pagination support.
**Query Parameters:**
- `page` (optional): Page number, starting from 0 (default: 0)
- `size` (optional): Number of items per page (default: 10)

**Request Example:**
``` http
GET /api/services?page=0&size=10
Authorization: Bearer <token>
```
**Response (200 OK):**
``` json
{
  "content": [
    {
      "id": 1,
      "serviceName": "Web Development",
      "startDate": "2024-01-01",
      "expiryDate": "2024-12-31",
      "paymentDueDate": "2024-01-15",
      "amount": 5000.00,
      "status": "ACTIVE",
      "vendor": {
        "id": 1,
        "name": "Tech Solutions Inc",
        "contactPerson": "John Doe",
        "email": "john@techsolutions.com",
        "phone": "+1-555-0123",
        "status": "ACTIVE"
      }
    }
  ],
  "pageable": {
    "sort": {
      "sorted": false,
      "unsorted": true
    },
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 1,
  "totalPages": 1,
  "last": true,
  "first": true,
  "number": 0,
  "size": 10
}
```
### GET /api/services/{id}
Retrieve a specific service by ID.
**Request Example:**
``` http
GET /api/services/1
Authorization: Bearer <token>
```
**Response (200 OK):**
``` json
{
  "id": 1,
  "serviceName": "Web Development",
  "startDate": "2024-01-01",
  "expiryDate": "2024-12-31",
  "paymentDueDate": "2024-01-15",
  "amount": 5000.00,
  "status": "ACTIVE",
  "vendor": {
    "id": 1,
    "name": "Tech Solutions Inc",
    "contactPerson": "John Doe",
    "email": "john@techsolutions.com",
    "phone": "+1-555-0123",
    "status": "ACTIVE"
  }
}
```
### POST /api/services
Create a new service.
**Request:**
``` json
{
  "serviceName": "Mobile App Development",
  "startDate": "2024-02-01",
  "expiryDate": "2024-11-30",
  "paymentDueDate": "2024-02-15",
  "amount": 7500.00,
  "status": "ACTIVE",
  "vendor": {
    "id": 1
  }
}
```
**Response (201 Created):**
``` json
{
  "id": 2,
  "serviceName": "Mobile App Development",
  "startDate": "2024-02-01",
  "expiryDate": "2024-11-30",
  "paymentDueDate": "2024-02-15",
  "amount": 7500.00,
  "status": "ACTIVE",
  "vendor": {
    "id": 1,
    "name": "Tech Solutions Inc",
    "contactPerson": "John Doe",
    "email": "john@techsolutions.com",
    "phone": "+1-555-0123",
    "status": "ACTIVE"
  }
}
```
### PUT /api/services/{id}
Update an existing service.
**Request:**
``` json
{
  "serviceName": "Web Development - Enhanced",
  "startDate": "2024-01-01",
  "expiryDate": "2024-12-31",
  "paymentDueDate": "2024-01-15",
  "amount": 6000.00,
  "status": "ACTIVE",
  "vendor": {
    "id": 1
  }
}
```
**Response (200 OK):**
``` json
{
  "id": 1,
  "serviceName": "Web Development - Enhanced",
  "startDate": "2024-01-01",
  "expiryDate": "2024-12-31",
  "paymentDueDate": "2024-01-15",
  "amount": 6000.00,
  "status": "ACTIVE",
  "vendor": {
    "id": 1,
    "name": "Tech Solutions Inc",
    "contactPerson": "John Doe",
    "email": "john@techsolutions.com",
    "phone": "+1-555-0123",
    "status": "ACTIVE"
  }
}
```
### DELETE /api/services/{id}
Delete a service by ID.
**Request Example:**
``` http
DELETE /api/services/1
Authorization: Bearer <token>
```
**Response (204 No Content)**
## 4. Notification Endpoints
### GET /api/services/expiring-soon
Retrieve services expiring within 15 days.
**Request Example:**
``` http
GET /api/services/expiring-soon
Authorization: Bearer <token>
```
**Response (200 OK):**
``` json
[
  {
    "id": 1,
    "serviceName": "Web Development",
    "startDate": "2024-01-01",
    "expiryDate": "2024-10-15",
    "paymentDueDate": "2024-01-15",
    "amount": 5000.00,
    "status": "ACTIVE",
    "vendor": {
      "id": 1,
      "name": "Tech Solutions Inc",
      "contactPerson": "John Doe",
      "email": "john@techsolutions.com",
      "phone": "+1-555-0123",
      "status": "ACTIVE"
    }
  }
]
```
### GET /api/services/payment-due-soon
Retrieve services with payments due within 15 days.
**Request Example:**
``` http
GET /api/services/payment-due-soon
Authorization: Bearer <token>
```
**Response (200 OK):**
``` json
[
  {
    "id": 2,
    "serviceName": "Mobile App Development",
    "startDate": "2024-02-01",
    "expiryDate": "2024-11-30",
    "paymentDueDate": "2024-10-20",
    "amount": 7500.00,
    "status": "ACTIVE",
    "vendor": {
      "id": 1,
      "name": "Tech Solutions Inc",
      "contactPerson": "John Doe",
      "email": "john@techsolutions.com",
      "phone": "+1-555-0123",
      "status": "ACTIVE"
    }
  }
]
```
## 6. Common Response Codes
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Resource deleted successfully
- **400 Bad Request**: Invalid request data or validation errors
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## 7. Common Error Response Format
``` json
{
  "timestamp": "2024-10-06T10:30:00.000Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/vendors"
}
```
## 8. Status Values
### Vendor Status:
- `ACTIVE`: Vendor is currently active
- `INACTIVE`: Vendor is inactive/disabled

### Service Status:
- `ACTIVE`: Service is currently active
- `EXPIRED`: Service has expired
- `SUSPENDED`: Service is temporarily suspended
- `CANCELLED`: Service has been cancelled

This API documentation provides a complete reference for integrating with the Vendor Management System's RESTful endpoints.


## Design Choices Analysis
### 1. Database Schema Design
#### **Database Choice: H2 In-Memory**
- **Rationale**: H2 provides rapid development and testing with zero configuration
- **Trade-offs**: Data persistence only during application runtime - suitable for demos and development
- **Production Consideration**: Easily replaceable with PostgreSQL/MySQL by changing dependencies and configuration

#### **Expected Entity Design**
Based on the API documentation, the schema likely includes:
**Vendors Table:**
- Primary entities with basic contact information
- Status-based soft deletion approach (ACTIVE/INACTIVE)
- Centralized vendor information for relationship management

**Services Table:**
- Contract/service records linked to vendors
- Time-based tracking (start date, expiry, payment due dates)
- Financial tracking with amount fields
- Status management for service lifecycle

**Users Table:**
- Authentication and authorization management
- Role-based access control (USER/ADMIN)
- JWT token-based session management

### 2. Library and Framework Choices
#### **Core Framework: Spring Boot 3.5.6**
- **Latest LTS**: Leverages modern Spring features and performance improvements
- **Auto-configuration**: Reduces boilerplate configuration
- **Production-ready**: Built-in metrics, health checks, and monitoring

#### **Data Access: Spring Data JPA**
- **Repository Pattern**: Automatic CRUD operations with minimal code
- **Query Methods**: Type-safe query derivation from method names
- **Pagination Support**: Built-in pagination for large datasets
- **Transaction Management**: Declarative transaction handling

#### **Security: Spring Security + JWT**
``` groovy
implementation 'org.springframework.boot:spring-boot-starter-security'
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
```
- **Stateless Authentication**: JWT tokens eliminate server-side session storage
- **JJWT Library**: Industry-standard JWT implementation with security features
- **Role-based Authorization**: Granular access control

#### **Validation: Bean Validation**
``` groovy
implementation 'org.springframework.boot:spring-boot-starter-validation'
```
- **Declarative Validation**: Annotation-based field validation
- **Consistent Error Handling**: Standardized validation error responses

#### **Email Integration: Spring Mail**
``` groovy
implementation 'org.springframework.boot:spring-boot-starter-mail'
```
- **SMTP Support**: Automated notifications for expiring services
- **Template-based**: HTML email templates for professional communication

### 3. Architectural Design Patterns
#### **Three-Tier Architecture**
- **Controller Layer**: RESTful API endpoints with proper HTTP semantics
- **Service Layer**: Business logic and transaction boundaries
- **Repository Layer**: Data access abstraction

#### **Repository Pattern**
- **Spring Data JPA**: Automatic implementation of repository interfaces
- **Custom Queries**: Support for complex business queries
- **Pagination**: Efficient large dataset handling

#### **DTO Pattern**
- **API Contracts**: Separation between internal entities and external API
- **Security**: Prevents over-exposure of internal data structures
- **Versioning**: Easier API evolution without breaking clients

### 4. Key Assumptions and Design Decisions
#### **Business Logic Assumptions**
- **Single Tenant**: One organization manages all vendors and services
- **Simple Workflow**: Basic CRUD operations without complex approval processes
- **Time-based Notifications**: 15-day advance notice for expirations and payments
- **Status-based Management**: Soft deletion using status fields

#### **Technical Assumptions**
- **Stateless API**: RESTful design with JWT authentication
- **JSON Communication**: All API communication in JSON format
- **UTF-8 Encoding**: Unicode support for international vendor data
- **HTTP Status Codes**: Proper RESTful status code usage

#### **Security Design**
- **JWT Expiry**: 24-hour token expiration for security
- **Role-based Access**: USER and ADMIN roles with different permissions
- **HTTPS Ready**: Secure communication support
- **CORS Enabled**: Cross-origin request support for frontend integration

#### **Scalability Considerations**
- **Stateless Design**: Horizontal scaling capability
- **Database Abstraction**: Easy migration to production databases
- **Microservice Ready**: Modular structure allows service extraction
- **Caching Ready**: JPA second-level cache support

### 5. Trade-offs and Limitations
#### **Current Limitations**
- **In-Memory Database**: No data persistence between restarts
- **Simple Authentication**: No OAuth2 or external identity providers
- **Basic Notifications**: Email-only notification system
- **No Audit Trail**: Limited tracking of data changes

#### **Chosen Trade-offs**
- **Simplicity over Complexity**: Rapid development and easy deployment
- **Development Speed over Production Features**: Quick prototyping capability
- **Convention over Configuration**: Spring Boot defaults reduce setup time
- **Monolithic over Microservices**: Simplified deployment and debugging

### 6. Future Extension Points
The design allows for easy extension:
- **Database Migration**: Change to PostgreSQL/MySQL with minimal configuration changes
- **Authentication Providers**: Add OAuth2, LDAP, or SAML support
- **Notification Channels**: Extend to SMS, Slack, or other communication methods
- **Advanced Features**: Add reporting, analytics, and workflow management
- **Microservice Split**: Extract vendor and service management into separate services

This design provides a solid foundation for a vendor management system while maintaining flexibility for future enhancements and production deployment.



