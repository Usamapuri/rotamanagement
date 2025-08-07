const mongoose = require("mongoose");
const User = require("../models/user");
const Team = require("../models/team");
const Shift = require("../models/shift");
const config = require("../config/db");

// Connect to MongoDB
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.error("MongoDB connection error:", err));

// Seed data
const seedUsers = [
  {
    username: "123@qwe.com",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "14169990000",
    location: "345 toronto st.",
    isManager: true,
    teamId: "1"
  }
];

const seedTeams = [
  {
    name: "Coffee line",
    description: "Tims"
  }
];

const seedShifts = [
  {
    name: "Coffee Maker",
    description: "Hard worker need",
    claimed: 0,
    capacity: 5,
    location: "124 University Ave",
    date: "09-11-2019",
    start: 1400,
    end: 1700,
    teamId: "1"
  }
];

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Shift.deleteMany({});
    
    console.log("Cleared existing data");

    // Create teams
    const createdTeams = await Team.insertMany(seedTeams);
    console.log("Teams seeded:", createdTeams.length);

    // Create users with hashed passwords
    for (const userData of seedUsers) {
      await User.register(new User(userData), "123");
    }
    console.log("Users seeded:", seedUsers.length);

    // Create shifts
    const createdShifts = await Shift.insertMany(seedShifts);
    console.log("Shifts seeded:", createdShifts.length);

    console.log("Database seeding completed successfully!");
    
    // Display admin credentials
    console.log("\n=== ADMIN LOGIN CREDENTIALS ===");
    console.log("Username: 123@qwe.com");
    console.log("Password: 123");
    console.log("================================");

  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();
