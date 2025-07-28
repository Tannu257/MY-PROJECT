
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/company');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

connectDB();

// Define Mongoose schema and model
const employeeSchema = new mongoose.Schema(
  {
    empName: { type: String, required: true, unique: true },
    empEmail: { type: String, required: true },  // Capital S String
    empSal: { type: Number, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);

// Fix route spelling to '/api/employees'
app.post('/api/employees', async (req, res) => {
  try {
    // Map incoming fields from frontend to schema fields
    const { name, email, salary } = req.body;

    const employee = new Employee({
      empName: name,
      empEmail: email,
      empSal: salary,
    });

    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/employees', async (req, res) => {
    try
    {
        const employees = await Employee.find();
        res.json(employees);
    }
    catch (error)
    {
        res.status(500).json({message: error.message });
    }
});

app.get('/api/employees/:id', async (req, res) => {
    try
    {
        const employee = await Employee.findById(req.params.id);
        if (!employee)
            return res.status(404).json({ message: 'Employee not found'});
        res.json(employee);

    }
    catch (error)
    {
        res.status(500).json({ message:error.message});
       
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try 
    {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) 
            return res.status(404).json({ message: 'Employee not found' });
            res.json({ message: 'Employee deleted successfully' });
    } 
    catch (error) 
    {
        res.status(500).json({ message: error.message });
    }
});

// Update employee by ID
app.put('/api/employees/:id', async (req, res) => {
     try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
                req.params.id,
                req.body,{ 
                new: true,  //Update ke baad updated document return kare.
                runValidators: true //Schema ke validation rules ko enforce kare 
                    //update ke waqt bhi
            });
    if (!updatedEmployee) 
        return res.status(404).json({ message: 'Employee not found' });
        //res.json(updatedEmployee);
        res.json({ message: 'Employee Updated successfully' });
    } 
    catch (error){
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
