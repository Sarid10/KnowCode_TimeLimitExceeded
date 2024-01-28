import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./HomePage.module.css";

import { useContract } from "../context/context";

const Disease = () => {
  const { contract, account } = useContract();

  const [patientProfile, setPatientProfile] = useState([])
  const [data, setData] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const pf = await contract.getAllRecords(account);
      for (let d in pf) {
        setData((prevData) => [...prevData, pf[d][1]]);
      }
      setPatientProfile(pf)
    }
    getData()
  }, [])



  if (!patientProfile) {
    return <h1>Loading</h1>
  }

  return (
    <div>
      <div className={styles.loremIpsumDolor} style={{ fontWeight: "bolder", fontSize: "70px", marginBottom: "50px" }}>
        List Of Diseases:
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginLeft: "auto", marginRight: "auto" }}>
        {
          data && data.map((element, idx) => {
            return (
              <button className={styles.button} key={idx} >
                <div className={styles.getStarted}>{element}</div>
              </button>
            )
          })

        }
      </div>
    </div>
  )
};

export default Disease;
