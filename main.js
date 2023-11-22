const mongoose = require("mongoose");
require("dotenv").config();

main().catch((error) => console.error(error));

async function main() {
  await mongoose
    .connect(process.env.TEST_DB)
    .then(console.log("Succesfully connected"));
}

//create a structure/prototype of the document
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comment: [{ body: String, date: Date }],
  dat: { type: Date, default: Date.now() },
  hidden: Boolean,
  meta: { votes: Number, favs: Number },
});

//create a model/constructor that takes string as 1st param
// which will be the name of doc. we're creating; and pass
//the schema we've created.
const blogModel = mongoose.model("kitten", blogSchema);

//create an instance of model constructor
const blogInstance = new blogModel({ name: "Silence" });
console.log(blogInstance);
console.log("id", blogInstance._id);

//add a mthd speak() to the doc
//we have to add the methd first in schema then compile
// in model
blogSchema.method.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

//create a model again
const blogModelMod = mongoose.model("blog", blogSchema);

const blogInstance2 = new blogModelMod({ name: "Silence" });

//we need to save the model instance
blogInstance2.save();

console.log("method speak is added to doc " + blogInstance2);
