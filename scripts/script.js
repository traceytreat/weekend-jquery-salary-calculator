$(document).ready(onReady);

let employees = [];
let employeeIDs = [];
let monthlySalary = 0;

function onReady(){
    $('#submitButton').on('click', addEmployee);
    $('#employeesTable').on('click', '.deleteButton', deleteEmployee);
}

function addEmployee(){

    if (employeeIDs.includes($('#employeeID').val())){
        // I'm assuming each ID is unique, so you can't add duplicates.
        $('#warning').text('An employee with that ID already exists');
    } else if ($('#firstName').val() === '' || $('#lastName').val() === '' || Number($('#employeeID').val()) === 0 || $('#employeeTitle').val() === '' || Number($('#annualSalary').val()) === 0) {
        // Check for empty fields
        $('#warning').text('Please fill out all fields');
    
    } else {
        $('#warning').text('');

        // Get values from input, store in employee object.
        let employee = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            employeeID: $('#employeeID').val(),
            employeeTitle: $('#employeeTitle').val(),
            annualSalary: $('#annualSalary').val()
        }

        // Push ID to IDs array
        employeeIDs.push($('#employeeID').val());
        console.log(employeeIDs);

        // Push employee object to employees array
        employees.push(employee);

        // Clear values.
        $('#firstName').val('');
        $('#lastName').val('');
        $('#employeeID').val('');
        $('#employeeTitle').val('');
        $('#annualSalary').val('');
    
        render();
    
    }


}

function deleteEmployee(){
    let newEmployees = [];
    let newEmployeeIDs = [];

    $('#warning').text('');

    newEmployees = employees.filter(employee => employee.employeeID != this.id);
    for (let id of employeeIDs){
        if (id !== this.id){
            newEmployeeIDs.push(id);
        }
    }
    employees = newEmployees;
    employeeIDs = newEmployeeIDs;

    render();
}

function render(){

    // Empty employees table
    $('#employeesTable').empty();

    // Header of table
    if (employees.length !== 0){
        $('#employeesTable').append(`
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>ID</th>
                <th>Title</th>
                <th>Salary</th>
                <th></th>
            <tr>
        `);
    } else {
        $('#employeesTable').append(`
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>ID</th>
                <th>Title</th>
                <th>Salary</th>
            <tr>
        `);
    }

    // Add data to table
    for (let employee of employees){
        console.log(employee);
        $('#employeesTable').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.employeeID}</td>
                <td>${employee.employeeTitle}</td>
                <td class="salary">$${employee.annualSalary}</td>
                <td class="tableDeleteButton">
                    <button id="${employee.employeeID}" class="deleteButton">Delete</button>
                </td>
            </tr>
        
        `);
    }

    //Update monthly salary
    monthlySalary = 0;
    for (let employee of employees){
        monthlySalary += Number(employee.annualSalary);
    };
    monthlySalary = Math.round(((monthlySalary / 12) * 100)) / 100;
    if (monthlySalary > 20000){
        $('#totalMonthly').css("background-color", "lightcoral");
    } else {
        $('#totalMonthly').css("background-color", "transparent");
    }
    $('#totalMonthly').empty();
    $('#totalMonthly').append(`
        <p>Total Monthly: $${monthlySalary}</p>
    `);

}