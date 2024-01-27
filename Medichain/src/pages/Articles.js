// import React, { useState } from "react";
// import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
// import { useEffect } from "react";

// import { useContract } from "../context/context";

// const Articles = () => {
//   useEffect(() => {}, []);

//   return <h1>Articles</h1>;
// };

// export default Articles;
// App.js

import React from 'react';
import PDFGenerator from './PDFGENERATOR';
import styles from "./HomePage.module.css";

const Articles = () => {
  const sampleData = [
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { name: 'Steve Smith', email: 'steve@smith.com', phone: '124-357-6890' },
    // Add more data as needed
  ];

  return (
    <div>
      <div className={styles.loremIpsumDolor} style={{ fontWeight: "bolder", fontSize: "30px", marginBottom: "20px" }}>
        PDF Generation with React
      </div>
      <PDFGenerator data={sampleData} />
    </div>
  );
};

export default Articles;