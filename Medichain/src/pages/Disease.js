import React, { useState } from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { useEffect } from "react";
import styles from "./HomePage.module.css";

import { useContract } from "../context/context";

const Disease = () => {
  const { contract, account } = useContract();

  const [patientProfile, setPatientProfile] = useState([])
  const [data, setData] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const pf = await contract.getPatientDetails(account);
      let temp = []
      for (let record in pf[5]) {


        temp.push(pf[5][record][1])



      }
      console.log(temp)
      setData(temp)
      setPatientProfile(pf)
    }
    getData()
  }, [])



  if (!patientProfile) {
    return <h1>Loading</h1>
  }

  return (
    <>
      {
        data && data.map((element, idx) => {
          return (
            <button className={styles.button} key={idx} >
              <div className={styles.getStarted}>{element}</div>
            </button>
          )
        })

      }
    </>
  )
};

export default Disease;
