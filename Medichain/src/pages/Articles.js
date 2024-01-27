import React, { useEffect, useState } from "react";
import PDFGenerator from "./PDFGenerator";
import styles from "./HomePage.module.css";
import { useContract } from "../context/context";

const Articles = () => {
  const { contract } = useContract();
  const [report, setReport] = useState({
    name: "",
    age: 0,
    weight: 0,
    height: 0,
    disease: "",
    drug: "",
    doctorAddress: "",
  });
  const [tempData, setTempData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await contract.getPatientDetails(
        "0x948b2bF9ca09477DdE6E46597aBCE7be39Bd0BA7"
      );
      const sampleData = [];

      const temp = [
        {
          name: data[1],
          age: data[2],
          weight: data[3],
          height: data[4],
          disease: data[5][0][1],
          drug: data[5][0][2],
          doctorAddress: data[5][0][4],
        },
      ];
      setReport(temp);
      console.log(temp);

      // setTempData(sampleData);
    };
    getData();
  }, []);
  const sampleData = [
    {},
    // Add more data as needed
  ];

  return (
    <div>
      <div
        className={styles.loremIpsumDolor}
        style={{ fontWeight: "bolder", fontSize: "30px", marginBottom: "20px" }}
      >
        PDF Generation with React
      </div>
      <PDFGenerator data={report} />
    </div>
  );
};

export default Articles;
