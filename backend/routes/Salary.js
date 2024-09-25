const router = require('express').Router();
const EmployeeSalary = require('../models/EmployeeSalaryModel.js');


router.route('/updateSalary/:id').put((req, res) => {
    const empId = req.params.id;
    const { empRole, empAttDayCount } = req.body; 

    EmployeeSalary.findById(empId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({ status: "Employee not found" });
            }

      
            if (empRole) {
                employee.empRole = empRole;
            }
            if (empAttDayCount !== undefined) {
                employee.empAttDayCount = empAttDayCount;
            }

            
            employee.save()
                .then(() => res.status(200).send({
                    status: "Employee updated",
                    empBasicSalary: employee.empBasicSalary,
                    empTotalSalary: employee.empBasicSalary * employee.empAttDayCount
                }))
                .catch(err => res.status(500).send({ status: "Error updating employee", error: err.message }));
        })
        .catch(err => res.status(500).send({ status: "Error finding employee", error: err.message }));
});




router.route('/:id').get((req, res) => {
    const empId = req.params.id;

    EmployeeSalary.findById(empId)
        .then(employee => res.json({
            empName: employee.empName,
            empRole: employee.empRole,
            empBasicSalary: employee.empBasicSalary,
            empTotalSalary: employee.empTotalSalary
        }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
