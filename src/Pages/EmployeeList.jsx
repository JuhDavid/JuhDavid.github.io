import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("https://rocky-falls-31896-02470e784f64.herokuapp.com/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`https://rocky-falls-31896-02470e784f64.herokuapp.com/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [order, setOrder] = useState('');

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const sortedEmployees = employees.sort((a, b) => {
    if (order) {
      const valueA = eval(`a.${order}`);
      const valueB = eval(`b.${order}`);
      return valueA.localeCompare(valueB);
    } else {
      return 0; // If no order is selected, return no sorting
    }
  });
  

  return (
    <div>
      <button onClick={() => setOrder("name.split(' ')[0]")}>Sort by first name!</button>
      <button onClick={() => setOrder("name.split(' ').pop()")}>Sort by last name!</button>
      <button onClick={() => setOrder("position")}>Sort by position!</button>
      <button onClick={() => setOrder("level")}>Sort by level!</button>
      <EmployeeTable employees={sortedEmployees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeList;
