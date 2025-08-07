# Rota Management System

A comprehensive shift management application built with Node.js, Express, MongoDB, and React. This system allows managers to create and manage shifts, while employees can view and claim available shifts.

## Features

### For Managers:
- Create and manage teams
- Add team members
- Create shifts with capacity limits
- Approve/decline shift claims
- View all team members and their shifts
- Delete shifts and users

### For Employees:
- View available shifts
- Claim shifts
- View personal shift history
- Dashboard with upcoming and today's shifts

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, React Router, Axios
- **Authentication**: Passport.js with local strategy
- **Styling**: Custom CSS with modern design
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rotamanagement
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=8080
   NODE_ENV=development
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create collections when first used

## Running the Application

### Development Mode
```bash
# Run both backend and frontend concurrently
npm run dev
```

### Production Mode
```bash
# Build the frontend
npm run build-client

# Start the server
npm start
```

The application will be available at `http://localhost:8080`

## Docker Deployment

### Local Docker
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Railway Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Railway**
   - Connect your GitHub repository to Railway
   - Railway will automatically detect the Dockerfile and build the application
   - Set environment variables in Railway dashboard:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: production

3. **Database Setup on Railway**
   - Add a MongoDB service in Railway
   - Connect it to your application
   - Railway will automatically provide the `MONGODB_URI` environment variable

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### Shifts
- `GET /api/shifts/:teamId` - Get all shifts for a team
- `POST /api/shifts/manager/addshift` - Create new shift (manager only)
- `PUT /api/shifts/manager/shift/:id` - Update shift capacity
- `DELETE /api/shifts/manager/deleteshift/:id` - Delete shift (manager only)
- `PUT /api/shifts/manager/fillShift/:id` - Fill shift capacity

### Users
- `GET /api/user/manager/all/:teamId` - Get all team members (manager only)
- `GET /api/user/employee/shifts/:userId` - Get user's shifts
- `POST /api/user/manager/addemployee` - Add new employee (manager only)
- `PUT /api/user/employee/claimShift/:shiftId` - Claim a shift
- `PUT /api/user/employee/approveShift/:shiftId` - Approve shift claim
- `PUT /api/user/employee/declineShift/:shiftId` - Decline shift claim

### Teams
- `GET /api/team/all` - Get all teams
- `POST /api/team/addteam` - Create new team
- `DELETE /api/team/removeteam/:id` - Delete team

## Usage Guide

### First Time Setup
1. Register as a manager
2. Create a team
3. Add team members
4. Create shifts for your team

### For Managers
1. Navigate to Teams to create and manage teams
2. Use User Management to add team members
3. Create shifts in the Shifts section
4. Approve or decline shift claims from employees

### For Employees
1. Register with your team ID
2. View available shifts in the Shifts section
3. Claim shifts you want to work
4. Check your dashboard for upcoming shifts

## Project Structure

```
rotamanagement/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   └── ...
│   └── package.json
├── config/                 # Configuration files
├── controllers/            # Express controllers
├── models/                 # Mongoose models
├── routes/                 # Express routes
├── scripts/                # Database seeding scripts
├── server.js              # Main server file
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── package.json           # Backend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the GitHub repository.
