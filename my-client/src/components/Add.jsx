import React, { useState } from 'react';
import axios from 'axios';
import './add.css';

export default function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');

  async function addHandler(e) {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/employees',
         { name, email, salary, }
        );
     alert(response.data.message);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="main-container">
      <h1>Login Portal</h1>
      <form onSubmit={addHandler}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/> <br /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br /> <br />
        <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)}/> <br /><br />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
