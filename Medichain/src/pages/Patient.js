import React, { useState } from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { useEffect } from "react";

import { useContract } from "../context/context";
import { usePatientContext } from "../context/patientContext";

const Patient = () => {
  // useEffect(() => {}, []);

  const { profile } = usePatientContext();



  return <h1>{profile}</h1>;
};

export default Patient;
