# MongoDB Atlas Setup Instructions

## 🚀 Quick Fix for Data Not Appearing

### Step 1: Install Dependencies
```bash
npm install mongoose
```

### Step 2: Create .env.local file
Create `.env.local` in your project root (same level as package.json):
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sikkim_tourism?retryWrites=true&w=majority
```

### Step 3: MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com/
2. Sign up/Login to your account
3. Create a new project called "Sikkim Tourism"
4. Create a new cluster (free M0 tier)
5. **IMPORTANT**: Set up database access:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `sikkimuser` 
   - Password: Generate a secure password
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

6. **CRITICAL**: Set up network access:
   - Go to "Network Access" in left sidebar  
   - Click "Add IP Address"
   - Choose "Add Current IP Address" OR "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

7. Get connection string:
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `sikkim_tourism`

### Step 4: Test MongoDB Connection
Visit: http://localhost:3000/api/test-mongodb

This will show:
- ✅ Connection status
- ✅ Number of bookings and payments
- ✅ Recent records
- ❌ Error details if connection fails

### Step 5: Create Test Data
Send POST request to test endpoint:
```bash
curl -X POST http://localhost:3000/api/test-mongodb -H "Content-Type: application/json" -d '{"action": "createTest"}'
```

## 🔍 Troubleshooting

### Issue: "MongoNetworkError" or "Could not connect"
**Solution**: Check Network Access settings in MongoDB Atlas. Add your IP address or allow all IPs (0.0.0.0/0).

### Issue: "Authentication failed" 
**Solution**: Verify username/password in connection string matches Database User in Atlas.

### Issue: "No data appearing in Atlas"
**Solution**: 
1. Check console logs in browser developer tools
2. Visit `/api/test-mongodb` to verify connection
3. Ensure environment variable is loaded (restart Next.js server)

### Issue: "Database/Collection not found"
**Solution**: MongoDB creates database and collections automatically when first document is inserted. No manual creation needed.

## 📊 Verify Data in MongoDB Atlas
1. Go to MongoDB Atlas Dashboard
2. Click "Browse Collections" on your cluster
3. You should see:
   - Database: `sikkim_tourism`
   - Collections: `bookings` and `payments`
   - Documents with your booking and payment data