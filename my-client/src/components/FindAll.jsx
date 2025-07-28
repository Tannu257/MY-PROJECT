import axios from "axios";
import { useState } from "react";
import './FindAll.css';


export function FindAll() {
    const [employees, setEmployees] = useState([]);

    async function findAllHandler(e) {
        e.preventDefault();
        try {
            const response = await axios.get("https://my-project-49vm.onrender.com/api/employees");
            setEmployees(response.data);
        } catch (err) {
            alert(err);
        }
    }
    return(
        <div className="findall-container">
            <h1>Employee Record</h1>
            <hr/>
            <form onSubmit={findAllHandler}>
                <button type="submit">Get All Records</button>
            </form>
            <div className="table-responsive">
                <table>
                    <thead>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                    </thead>
                    <tbody>
                        {
                            employees.length > 0 ? (
                                employees.map(emp => (
                                    <tr>
                                        <td>{emp._id}</td>
                                        <td>{emp.empName}</td>
                                        <td>{emp.empEmail}</td>
                                        <td>{emp.empSal}</td>
                                    </tr>
                                ))
                            ) : <tr><td colspan={'4'}>No Record</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
