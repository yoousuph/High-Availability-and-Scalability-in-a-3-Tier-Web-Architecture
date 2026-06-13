# Modern 3-Tier Web Application Deployment on AWS

## Project Overview

This project demonstrates the deployment of a highly available, scalable, and secure 3-tier web application architecture on Amazon Web Services (AWS).

The application consists of:

* Presentation Tier (Frontend)
* Application Tier (Backend API)
* Data Tier (MySQL Database)

The infrastructure follows AWS best practices by isolating resources into public and private subnets, implementing load balancing, and securing backend resources from direct internet access.

---

# Architecture Diagram

![Project Screenshot 1.JPG](C:\Users\REALITY\Documents\Projects\Cloud\aws_3tier_architecture\imgs\1.JPG)

---

# Technology Stack

## Frontend

* React.js
* HTML5
* CSS3
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MySQL
* Amazon RDS

## Infrastructure

* Amazon VPC
* Application Load Balancer (ALB)
* Auto Scaling Groups
* NAT Gateway
* Internet Gateway
* Route Tables
* Security Groups
* IAM Roles
* EC2 Instances
* RDS Instance

---

# AWS Architecture Components

## Networking Layer

### VPC

Custom Virtual Private Cloud(VPC) created to isolate application resources.

CIDR Block:

```
10.0.0.0/16
```

### Subnets

#### Public Subnets

Used for:

* Frontend Web Server
* NAT Gateway
* Internet Gateway Attachment

Examples:

```
10.0.0.0/24
10.0.0.32/24
```

#### Private Subnets

Used for:

* Backend EC2 Instances 
* Amazon RDS Database

Examples:

```
10.0.0.64/24
10.0.0.96/24
10.0.0.128/24
10.0.0.160/24
```

---

# Security Design

## Security Groups

### Frontend Security Group

Allow:

| Type             | Port | Source    
| -----            | ---- | --------- 
| Application Port | 80 | External ALB  

---

### Backend Security Group

Allow:

| Type             | Port | Source        
| ---------------- | ---- | ------------- 
| Application Port | 4000 | Internal ALB  

---

### Database Security Group

Allow:

| Type  | Port | Source     |
| ----- | ---- | ---------- |
| MySQL | 3306 | Backend SG |

---
---

# Deployment Process

## Step 1: Create IAM Role
SSM-for-ec2 IAM Role to be attached to the EC2 Instances in the Private Subnet.

## Step 1: Create S3 Bucket
SSM-for-ec2 IAM Role to be attached to the EC2 Instances in the Private Subnet.

## Step 1: Create VPC

Create:

* VPC
* 2 Public Subnets
* 4 Private Subnets
* 5 Security Groups
* 1 Internet Gateway
* 1 NAT Gateway (in the public subnet)
* 2 Route Tables (Main Route and Secondary Route to Internet)

---

## Step 2: Create Database Layer

Launch Amazon RDS MySQL.

Example:

```
Engine: MySQL 8.0
Instance Class: db.m8g.large
Storage: 20 GB
```

Create database:

```sql
CREATE DATABASE appdb;
USE appdb;
```

Create table:

```sql
CREATE TABLE IF NOT EXISTS transactions(
  id INT NOT NULL AUTO_INCREMENT, 
  amount DECIMAL(10,2), 
  description VARCHAR(100), 
  PRIMARY KEY(id)
);
```
Insert into table:

```sql
SHOW TABLES;
INSERT INTO transactions (amount, description) VALUES ('5000', 'Provision');
```

---

## Step 3: Deploy Backend Application

Run on the terminal:

```bash
curl -o- https://raw.githubusercontent.com/yoousuph/aws_3tier_architecture/main/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
```

Copy backend-app folder from S3 into app tier EC2 instance:

```bash
aws s3 cp s3://yusuf-three-tier-app-files/backend-app/ backend-app --recursive

cd ~/backend-app
```

Install dependencies:

```bash
npm install
```

Install PM2:

```bash
pm2 start index.js
```

Check and save PM2:

```bash
pm2 list
pm2 logs
pm2 startup
pm2 save
```

Verify:

```bash
curl http://localhost:4000/health
```
Result: "This is the health check"

Expected:

```json
{
  "status":"healthy"
}
```

---

## Step 4: Deploy Frontend Application

Run on the terminal:

```bash
curl -o- https://raw.githubusercontent.com/yoousuph/aws_3tier_architecture/main/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16
```

Copy frontend-app folder from S3 into web tier EC2 instance:

```bash
aws s3 cp s3://yusuf-three-tier-app-files/frontend-ui/ frontend-ui --recursive

cd ~/frontend-ui
```

Install dependencies:

```bash
npm install
```

Build application:

```bash
npm run build
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---


# Load Balancer Configuration

## External ALB (Internet Facing)

Purpose:

* Receives user traffic
* Routes requests to frontend instances

Listener:

```
80 → Frontend Target Group
```

Health Check:

```
/
```

---

## Internal ALB

Purpose:

* Routes API requests to backend instances

Listener:

```
80 → Backend Target Group
```

Health Check:

```
/health
```

---

# Auto Scaling

## Frontend ASG

Minimum Capacity:

```
2
```

Desired Capacity:

```
2
```

Maximum Capacity:

```
2
```

---

## Backend ASG

Minimum Capacity:

```
2
```

Desired Capacity:

```
2
```

Maximum Capacity:

```
2
```

---

# Monitoring

## Amazon CloudWatch

Monitored Metrics:

* CPU Utilization
* Memory Utilization
* Request Count
* Target Response Time
* Network Traffic

---

# Security Best Practices Implemented

* Multi-tier architecture
* Private database layer
* Security Group isolation
* Internal Load Balancer
* No direct internet access to backend
* No direct internet access to database
* Health checks enabled
* Auto Scaling enabled

---

# Future Improvements

* Kubernetes (EKS) Deployment
* Infrastructure as Code using Terraform
* CI/CD Pipeline with GitHub Actions
* AWS CodePipeline Integration
* Amazon CloudFront
* AWS WAF
* AWS Secrets Manager
* SSL/TLS with ACM
* Multi-Region Disaster Recovery

---

# Learning Outcomes

Through this project, I gained hands-on experience with:

* AWS Networking
* VPC Design
* Route Tables
* Load Balancing
* Auto Scaling
* EC2 Administration
* AWS CLI
* Amazon RDS
* Linux Administration
* Nginx Configuration
* Cloud Security
* High Availability Architecture

---

# Author

**Yusuf Kehinde**

Cloud Engineer | AWS Enthusiast | DevOps Learner

LinkedIn: https://www.linkedin.com/in/yusuf-kehinde-72a84023b/

GitHub: https://[github.com/yoousuph](https://github.com/yoousuph)
