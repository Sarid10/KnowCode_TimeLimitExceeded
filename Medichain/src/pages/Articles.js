import React, { useEffect, useState } from "react";
import PDFGenerator from "./PDFGenerator";
import styles from "./HomePage.module.css";
import { useContract } from "../context/context";
import { collection, addDoc } from "firebase/firestore";
import { db, FirebaseAuth } from "../firebase/firebase-config";
import { getDocs, query, where } from "firebase/firestore";
const Articles = () => {
  const { contract, account, authData } = useContract();
  console.log(account);
  const [caseNo, setCaseNo] = useState("");
  const [report, setReport] = useState({
    caseNo: "",
    name: "",
    age: 0,
    weight: 0,
    height: 0,
    disease: "",
    drug: "",
    doctorAddress: "",
  });
  const [tempData, setTempData] = useState([]);
  const [doc, setDoc] = useState("");

  const emailExists = async (email) => {
    const res = await getDocs(collection(db, "profiles"));
    for (let i = 0; i < res.docs.length; i++) {
      if (res?.docs[i]?.data()?.email == email) {
        // console.log("Hello", res?.docs[i]?.data()?.userType);
        // setUserType(res?.docs[i]?.data()?.userType);
        // console.log("Hello", userType);
        setDoc(res?.docs[i]?.data());
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const emailAlreadyExists = await emailExists(authData?.email);
        const data = await contract.getPatientRecord(
          1,
          "0x948b2bF9ca09477DdE6E46597aBCE7be39Bd0BA7"
        );
        console.log(data);

        const temp = [
          {
            caseNo: 1,
            name: doc.name,
            age: doc.age,
            weight: doc.weight,
            height: doc.height,
            disease: data[0],
            drug: data[1],
          },
        ];
        setReport(temp);
      } catch (err) {
        console.log(err);
      }

      // setTempData(sampleData);
    };
    getData();
  }, []);
  const sampleData = [
    {},
    // Add more data as needed
  ];
  console.log(doc);

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
