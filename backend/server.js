
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");


connectDB();

app.listen(9000, () => {
  console.log("Server running on port 9000");
});
