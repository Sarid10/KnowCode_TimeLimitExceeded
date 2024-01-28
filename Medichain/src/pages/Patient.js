import React, { useState } from "react";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { useEffect } from "react";
import styles from "./HomePage.module.css";
import { useContract } from "../context/context";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
  CardHeader,
  StackDivider,
  Box,
} from "@chakra-ui/react";
const Patient = () => {
  const { contract, account } = useContract();
  const [data, setData] = useState();
  const [pDetails, setpDetails] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const dataa = await contract?.getAllRecords(
        "0x948b2bF9ca09477DdE6E46597aBCE7be39Bd0BA7"
      );
      console.log(dataa);
      setData(dataa && dataa[0]);

      // let temp = [];
      // let temp2 = [];
      // for (let val in dataa[3]) {
      //   temp.push(dataa[3][val]);
      //   const res = await contract.getPatientDetails(dataa[3][val]);
      //   temp2.push(res);
      // }
      // setpDetails(temp2);
      // console.log(pDetails);
    };
    getData();
  }, []);

  return (
    <div>
      <div key={{}}>
        <Card style={{ width: "30%" }}>
          <CardHeader>
            <Heading size="md">Patient Report</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Disease Name :
                </Heading>
                <Text pt="2" fontSize="sm">
                  {data && data[1]}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Drug Name
                </Heading>
                <Text pt="2" fontSize="sm">
                  {data && data[2]}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Patient Weight
                </Heading>
                <Text pt="2" fontSize="sm">
                  60
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  height
                </Heading>
                <Text pt="2" fontSize="sm">
                  180
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Patient;
