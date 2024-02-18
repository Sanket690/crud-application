const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
var cors = require("cors");
app.use(cors());




const port = process.env.PORT || 3000;
//app.enableCors({ origin: "*" });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crud',{useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
 console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


//Schema

const sch = {
    firstname:String,
    lastname:String,
    email:String,
    dob:String,
    gender:String,
    education:String,
    company:String,
    experience:Number,
    package:Number,
}
const monmodel = mongoose.model("NEWCOL", sch);




//POST
app.post("/post", async(req, res)=> {
    console.log("inside post function");

    const data = new monmodel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        dob:req.body.dob,
        gender:req.body.gender,
        education:req.body.education,
        company:req.body.company,
        experience:req.body.experience,
        package:req.body.package,
    });

    const val = await data.save();

    res.json(val);

  })




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });



  //Show Employees
app.get('/get', async (req, res) => {
  try {
   
    const emps = await monmodel.find();

   
    res.json(emps);
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Delete data by name endpoint
app.delete('/del/:firstname', async (req, res) => {
  const firstname = req.params.firstname;

  try {
    const result = await monmodel.deleteOne({ firstname: firstname });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json({ message: 'Data deleted successfully' , result});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});



//Edit Employee Data
app.put('/put/:firstname', async (req, res) => {
  const firstname = req.params.firstname;
  const updatedEmployeeData = req.body;

  try {
    // Find the employee by ID and update the data
    const updatedEmployee = await monmodel.findOneAndUpdate({firstname: firstname}, updatedEmployeeData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});