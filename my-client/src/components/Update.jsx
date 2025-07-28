import React, { useState } from "react";
import axios from 'axios';
import './Update.css';
export function Update(){

    const[id,setId]     = useState("");
    const[empName,setName]     = useState("");
    const[empEmail,setEmail] = useState("");
    const[empSal,setSal]   = useState("");
    
    async function updateHandler(e)
    {
        e.preventDefault();
        try
        {
const response = await axios.put(`http://localhost:3000/api/employees/${id}`,
      {
        empName,
        empEmail,
        empSal:Number(empSal) 
      });
     alert(response.data.message);
        }
        catch(err)
        {
            alert(err);
        }
    }

    return(
        <div className="update-container">
            <h1>Update Record Screen</h1>
            <hr/>
            <form onSubmit={updateHandler}>
                <input type="text" placeholder="Enter Id"   value={id}      onChange={e => setId(e.target.value)}   required/><br/><br/>
                <input type="text" placeholder="Enter Name"   value={empName}   onChange={e => setName(e.target.value)}   required/><br/><br/>
                <input type="text" placeholder="Enter Email" value={empEmail} onChange={e => setEmail(e.target.value)} required/><br/><br/>
                <input type="text" placeholder="Enter Salary"  value={empSal}  onChange={e => setSal(e.target.value)}  required/><br/><br/>
                <button type="submit">Update Record</button>

            </form>
        </div>
    )
}