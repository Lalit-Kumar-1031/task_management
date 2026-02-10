const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is Started on http://localhost:${process.env.PORT}`);
});
