// DataTable.js

import React from 'react';

const DataTable = ({ data }) => {
    return (
        <table style={{border: "1px solid black", borderCollapse: "collapse", marginTop:"20px"}}>
  <thead>
      <tr style={{border: "1px solid black"}}>
      <th style={{border: "1px solid black", padding: "10px"}}>Name</th>
      <th style={{border: "1px solid black", padding: "10px"}}>Email</th>
      <th style={{border: "1px solid black", padding: "10px"}}>Phone</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index} style={{border: "1px solid black;"}}>
        <td style={{border: "1px solid black", padding: "10px"}}>{item.name}</td>
        <td style={{border: "1px solid black", padding: "10px"}}>{item.email}</td>
        <td style={{border: "1px solid black", padding: "10px"}}>{item.phone}</td>
      </tr>
    ))}
  </tbody>
</table>
    );
};

export default DataTable;