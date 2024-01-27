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

const Articles = () => {
  const sampleData = [
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    // Add more data as needed
  ];

  return (
    <div>
      <h1>PDF Generation with React</h1>
      <PDFGenerator data={sampleData} />
    </div>
  );
};

export default Articles;