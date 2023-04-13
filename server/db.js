const { MongoClient } = require('mongodb');

let db;

async function connectToDB(uri) {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = client.db('reflectAI');

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connectToDB,
  getDB,
};
