import React, { useEffect } from "react";
import { useContract } from "../context/context";

const DataTable = ({ data }) => {
  console.log("Table", typeof data);
  return (
    <table
      style={{
        border: "1px solid black",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr style={{ border: "1px solid black" }}>
          <th style={{ border: "1px solid black", padding: "10px" }}>Name</th>
          <th style={{ border: "1px solid black", padding: "10px" }}>Age</th>
          <th style={{ border: "1px solid black", padding: "10px" }}>Height</th>
          <th style={{ border: "1px solid black", padding: "10px" }}>Weight</th>
          <th style={{ border: "1px solid black", padding: "10px" }}>
            Disease
          </th>
          <th style={{ border: "1px solid black", padding: "10px" }}>Drug</th>
          <th style={{ border: "1px solid black", padding: "10px" }}>
            Doctor Address
          </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ border: "1px solid black;" }}>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.name}
          </td>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.age}
          </td>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.height}
          </td>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.weight}
          </td>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.disease}
          </td>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.drug}
          </td>
          <td style={{ border: "1px solid black", padding: "10px" }}>
            {data[0]?.doctorAddress}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataTable;
