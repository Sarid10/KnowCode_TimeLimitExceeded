import React, { useState } from "react";
import { useEffect } from "react";
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
} from "@chakra-ui/react";
import styles from "./HomePage.module.css";
import { useContract } from "../context/context";

const Medical_History = () => {
  const { contract, account } = useContract();

  const [patientProfile, setPatientProfile] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const pf = await contract.getPatientDetails(account);
      console.log(pf[5]);
      let temp = [];
      for (let record in pf[5]) {
        // for (let val in pf[5][record]) {
        //   if (typeof pf[5][record][val] !== typeof {}) {
        //     temp.push(pf[5][record][val])
        //   }
        // }
        temp.push(pf[5][record]);
      }
      console.log(pf);
      setData(temp);
      setPatientProfile(pf);
    };
    getData();
  }, []);

  return (
    <>
      {
        // data && data.map((element, idx) => {
        //   return (<div key={idx}>
        //     <div>{element[1]}</div>
        //     <div>{element[2]}</div>
        //     <div>{element[3]}</div>
        //     <div>{element[4]}</div>
        //   </div>)
        // })
        <div>
          <div
            className={styles.loremIpsumDolor}
            style={{
              fontWeight: "bolder",
              fontSize: "70px",
              marginBottom: "50px",
            }}
          >
            Medical History:
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {data &&
              data.map((element, idx) => {
                return (
                  <div key={idx}>
                    <Card maxW="sm" style={{ height: "100%" }}>
                      <CardBody>
                        <Image
                          style={{ height: "200px", width: "100%" }}
                          src={"/interaction.jpg"}
                          alt="Green double couch with wooden legs"
                          borderRadius="lg"
                        />
                        <Stack mt="6" spacing="3">
                          <Heading size="md" style={{ fontSize: "35px" }}>
                            Disease: {element[1]}
                          </Heading>
                          <Text style={{ fontSize: "25px" }}>
                            Drug: {element[2]}
                          </Text>
                          <Text color="blue.600" fontSize="2xl">
                            Address: {element[4]}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                    </Card>
                  </div>
                );
              })}
          </div>
        </div>
      }
    </>
  );
};

export default Medical_History;
