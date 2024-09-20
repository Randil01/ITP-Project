const mongoose = require('mongoose');

const schema = mongoose.Schema;

const EmployeeSalarySchema = new schema({
    empName: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    empAddress: {
        type: String,
        required: true
    },
    empPhone: {
        type: Number,
        required: true
    },
    empEmail: {
        type: String,
        required: true
    },
    empRole: {
        type: String,
        required: true,
        enum: ['operator', 'driver', 'servant']
    },
    empBasicSalary: {
        type: Number,
        default: 0
    },
    empAttDayCount: {
        type: Number,
        default: 0
    },
    empTotalSalary: {
        type: Number,
        default: 0
    }
});


EmployeeSalarySchema.pre('save', function (next) {
    switch (this.empRole) {
        case 'operator':
            this.empBasicSalary = 50000;
            break;
        case 'driver':
            this.empBasicSalary = 40000;
            break;
        case 'servant':
            this.empBasicSalary = 30000;
            break;
        default:
            this.empBasicSalary = 0;
    }


    this.empTotalSalary = this.empBasicSalary * this.empAttDayCount;

    next();
});

module.exports = mongoose.model("EmployeeSalary", EmployeeSalarySchema);
