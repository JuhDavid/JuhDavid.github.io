// EmployeeTable.js

import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const updateInventory = (employee) => {
  return fetch(`https://rocky-falls-31896-02470e784f64.herokuapp.com/api/employees/${employee._id.$oid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeTable = ({ employees, onDelete }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Contributions to science</th>
          <th />
        </tr>
      </thead>
      <tbody>
  {employees.map((employee) => (
    <tr key={employee._id}>
      <td>{employee.name}</td>
      <td>{employee.level}</td>
      <td>{employee.position}</td>
      <td>
        <table>
          <tbody>
            {employee.equipment.map((item) => (
              <tr key={item.name}>
                <td>Desctription: {item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
      <td>
        <Link to={`/update/${employee._id}`}>
          <button type="button">Update</button>
        </Link>
        <button type="button" onClick={() => onDelete(employee._id)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
);

export default EmployeeTable;
