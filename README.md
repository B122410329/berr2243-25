# BERR 2243 - Database And Cloud System

## Description
This is Exercise 1 for the subject **BERR 2243 - Database And Cloud System**. The project involves setting up a development environment, learning Git workflows, and creating a simple Node.js script to connect to MongoDB, insert a document, and retrieve it.

## Installation Steps

### 1. Install Development Tools
- **VSCode**: Download from [VSCode](https://code.visualstudio.com/).
- **Node.js & npm**: Download the LTS version from [Node.js](https://nodejs.org/).
- **MongoDB**: Follow the [MongoDB Community Server installation guide](https://www.mongodb.com/docs/manual/administration/install-community/).
  - Start MongoDB service:  
    ```sh
    mongod --dbpath /path/to/data/directory
    ```
- **Git**: Download from [Git](https://git-scm.com/).
  - Configure Git username and email:
    ```sh
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    ```
- **MongoDB Compass (Optional)**: Download from [MongoDB Compass](https://www.mongodb.com/products/compass).

### 2. Project Setup
1. Clone the repository:
   ```sh
   git clone <your-github-repo-link>
   cd <repository-name>
   ```
2. Initialize a Node.js project:
   ```sh
   npm init -y
   ```
3. Install the MongoDB driver:
   ```sh
   npm install mongodb
   ```

### 3. Usage
1. Run the script:
   ```sh
   node index.js
   ```
2. Expected console output:
   ```
   Connected to MongoDB!
   Document inserted!
   Query result: { _id: ObjectId("..."), name: "Your Name", age: 20 }
   ```
3. Verify in MongoDB Compass:
   - Connect to your MongoDB instance.
   - Navigate to `testDB.users` collection to view the inserted document.

### 4. Git Workflow
- Initialize Git repository:
  ```sh
  git init
  ```
- Create branches:
  ```sh
  git checkout -b main
  git checkout -b feature/setup
  ```
- Commit and push changes:
  ```sh
  git add .
  git commit -m "Initial commit"
  git push origin feature/setup
  ```

## Troubleshooting
- **MongoDB connection error:** Ensure the MongoDB service is running.
- **Cannot connect to MongoDB Compass:** Verify the connection string and port.
- **Git push error:** Check if the repository URL is correct and authentication is set up.

## Project Structure
```
/project-root
├── index.js
├── package.json
├── .gitignore
└── README.md
```
