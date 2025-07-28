import React from 'react';
import { NavLink, Route, Routes } from "react-router-dom";
import Add  from "./Add";
import {FindAll} from "./FindAll";

import {Find} from "./Find";
import {Delete} from "./Delete";
import { Update } from "./Update";
import './App.css';




function App(){
    return(
        <div>
          <h2>Employee Management</h2>
      <nav>
        <NavLink to="/Add" >Add</NavLink>
        <NavLink to="/Update" >Update</NavLink>
        <NavLink to="/Delete" >Delete</NavLink>
        <NavLink to="/Find" >Find</NavLink>
        <NavLink to="/FindAll" >FindAll</NavLink>


      </nav>

      <Routes>
        <Route path="/Add" element={<Add />} />
        <Route path="/Update" element={<Update />} />
        <Route path="/Delete" element={<Delete />} />       
        <Route path="/Find" element={<Find />} />
        <Route path="/FindAll" element={<FindAll />} />

      </Routes>      
        </div>
    )
}

export default App