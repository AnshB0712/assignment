

## Frontend Repository

### Setup Instructions

1. Open your terminal and navigate to the frontend repository folder:

   ```bash
   cd path/to/frontend
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

### Running the Application

To run the frontend application:

```bash
npm run dev
```

This command will start the development server and you can access the application in your browser at [http://localhost:5173](http://localhost:5173).

## Backend Repository

### Setup Instructions

1. Open your terminal and navigate to the backend repository folder:

   ```bash
   cd path/to/backend
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Inside the `root/constants/index.js` file, add your own MongoDB URI to connect to the database. Modify the file to include your MongoDB URI:

   ```javascript
   // root/constants/index.js

   const MONGODB_URI = 'your-mongodb-uri-goes-here';

   module.exports = {
     MONGODB_URI,
     // other constants...
   };
   ```

### Running the Application

To run the backend application:

```bash
npm run dev
```

This command will start the backend server. Make sure your MongoDB instance is running and accessible with the provided URI.

Now you have both the frontend and backend repositories set up and running. The frontend can be accessed in the browser, and the backend is ready to handle requests.
