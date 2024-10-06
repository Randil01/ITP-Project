const router = require('express').Router();
const EmployeeSalary = require('../models/EmployeeSalaryModel.js');


router.route('/update/:id').put(async (req, res) => {
    const empId = req.params.id;
    const { empName, empAddress, empPhone, empEmail, empRole, empAttDayCount } = req.body;

    try {
        const employee = await EmployeeSalary.findById(empId);
        if (!employee) {
            return res.status(404).send({ status: "Employee not found" });
        }


        if (empName) employee.empName = empName;
        if (empAddress) employee.empAddress = empAddress;
        if (empPhone) employee.empPhone = empPhone;
        if (empEmail) employee.empEmail = empEmail;

        
        if (empRole) {
            employee.empRole = empRole; 
        }

       
        if (empAttDayCount !== undefined) {
            employee.empAttDayCount = empAttDayCount;
        }


        await employee.save();
        res.status(200).send({
            status: "Employee updated",
            empBasicSalary: employee.empBasicSalary,
            empTotalSalary: employee.empTotalSalary
        });
    } catch (err) {
        res.status(500).send({ status: "Error updating employee", error: err.message });
    }
});


router.get('/roles', (req, res) => {
    try {
        const roles = EmployeeSalary.schema.path('empRole').enumValues;
        console.log('Roles:', roles);  
        res.json(roles);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching roles' });
    }
});


router.put('/updateRole/:id', async (req, res) => {
    try {
        const { empRole } = req.body;

       
        const employee = await EmployeeSalary.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        
        employee.empRole = empRole;

        
        await employee.save();

        res.status(200).json({
            message: 'Role updated successfully',
            empBasicSalary: employee.empBasicSalary,
            empTotalSalary: employee.empTotalSalary
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
});


router.route('/add').post((req, res) => {
    const { empName, empAddress, empPhone, empEmail, empRole, empAttDayCount } = req.body;

    const newEmployee = new EmployeeSalary({
        empName,
        empAddress,
        empPhone,
        empEmail,
        empRole,
        empAttDayCount
    });

    newEmployee.save()
        .then(() => res.json("Employee added"))
        .catch(err => res.status(500).json({ error: err.message }));
});


router.route('/').get((req, res) => {
    EmployeeSalary.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json({ error: err.message }));
});


router.route('/:id').get((req, res) => {
    const empId = req.params.id;

    EmployeeSalary.findById(empId)
        .then(employee => res.json(employee))
        .catch(err => res.status(500).json({ error: err.message }));
});

//login
router.route('/login').post(async (req, res) => {
    const { empEmail, empName } = req.body;
    
    try {
        const normalizedEmail = empEmail.trim().toLowerCase();
        const normalizedName = empName.trim();

        const employee = await EmployeeSalary.findOne({
            empEmail: normalizedEmail,
            empName: normalizedName
        });

        if (employee) {
            res.status(200).json({ message: 'Login successful', employee });
        } else {
            res.status(404).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route('/delete/:id').delete((req, res) => {
    const empId = req.params.id;

    EmployeeSalary.findByIdAndDelete(empId)
        .then(() => res.status(200).send({ status: "Employee deleted" }))
        .catch(err => res.status(500).send({ status: "Error deleting employee", error: err.message }));
});




module.exports = router;
