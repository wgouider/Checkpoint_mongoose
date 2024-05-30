require("dotenv").config();

const mongoose = require("mongoose");
const Person = require("./Models/person"); // Adjust the path as necessary

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    const arrayOfPeople = [
      { name: "John Doe", age: 28, favoriteFoods: ["Pizza", "Macaroni"] },
      { name: "Alice Smith", age: 34, favoriteFoods: ["Sushi", "Couscous"] },
      { name: "Bob Johnson", age: 45, favoriteFoods: ["Steak", "Frites"] },
      { name: "Charlie Brown", age: 30, favoriteFoods: ["Burger", "Salade"] },
      { name: "Diana Prince", age: 25, favoriteFoods: ["Ice Cream", "Cake"] },
    ];

    Person.create(arrayOfPeople, (err, data) => {
      if (err) {
        console.error("Error creating people:", err);
      } else {
        console.log("People created successfully:", data);
      }

      mongoose.connection.close();
    });
  });
//Find all people with a given name:
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Person.find({ name: "John Doe" }, (err, people) => {
      if (err) {
        console.error("Error finding people:", err);
      } else {
        console.log("People found:", people);
      }
      mongoose.connection.close();
    });
  });

//Find one person with a certain favorite food:

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const food = "Sushi";
    Person.findOne({ favoriteFoods: food }, (err, person) => {
      if (err) {
        console.error("Error finding person:", err);
      } else {
        console.log("Person found:", person);
      }
      mongoose.connection.close();
    });
  });

//Find a person by _id:

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const personId = "60c72b2f4f1a4c3d8c8a9f44"; 
    Person.findById(personId, (err, person) => {
      if (err) {
        console.error("Error finding person:", err);
      } else {
        console.log("Person found:", person);
      }
      mongoose.connection.close();
    });
  });

//Perform Classic Updates by Running Find, Edit, then Save Find a person by _id

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    const personId = "60c72b2f4f1a4c3d8c8a9f44";

    Person.findById(personId, (err, person) => {
      if (err) {
        console.error("Error finding person:", err);
        mongoose.connection.close();
        return;
      }

      if (!person) {
        console.log("Person not found");
        mongoose.connection.close();
        return;
      }

      person.favoriteFoods.push("Hamburger");

      person.save((err, updatedPerson) => {
        if (err) {
          console.error("Error saving person:", err);
        } else {
          console.log("Person updated successfully:", updatedPerson);
        }

        mongoose.connection.close();
      });
    });
  });

//Find and update a document using findOneAndUpdate():
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    const personName = "John Doe";

    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      (err, updatedPerson) => {
        if (err) {
          console.error("Error updating person:", err);
        } else {
          console.log("Person updated successfully:", updatedPerson);
        }

        mongoose.connection.close();
      }
    );
  });

//Delete One Document Using model.findByIdAndRemove
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    const personIdToRemove = "60c72b2f4f1a4c3d8c8a9f44"; // Replace with the _id of the document you want to remove

    Person.findByIdAndRemove(personIdToRemove, (err, removedPerson) => {
      if (err) {
        console.error("Error removing person:", err);
      } else if (!removedPerson) {
        console.log("Document not found");
      } else {
        console.log("Person removed successfully:", removedPerson);
      }

      mongoose.connection.close();
    });
  });

//Delete Many Documents with model.remove()
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    const condition = { name: "Mary" }; // Condition to match documents with the name "Mary"

    Person.remove(condition, (err, result) => {
      if (err) {
        console.error("Error removing documents:", err);
      } else {
        console.log(`${result.deletedCount} documents deleted`);
      }

      mongoose.connection.close();
    });
  })

  // MongoDB and Mongoose - Delete Many Documents with model.remove()
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful');

    // Chain query helpers to narrow search results
    Person.find({ favoriteFoods: 'Burritos' }) // Find people who like burritos
      .sort('name') // Sort them by name
      .limit(2) // Limit the results to two documents
      .select('-age') // Hide their age
      .exec((err, data) => { // Execute the query
        if (err) {
          console.error('Error finding people:', err);
        } else {
          console.log('People who like burritos:', data);
        }

        // Close the database connection after the operation
        mongoose.connection.close();
      });
  })



  .catch((err) => {
    console.error("Database connection error:", err);
  });
