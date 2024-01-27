import React, { useEffect, useState } from "react";
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
  ButtonGroup,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { account, contract } = useContract();
  const [usertype, setUsertype] = useState("");
  const [patientDetails, setPatientDetails] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906" || account === "0x597875bcA8d92C79Cbbc735A90aD25b8CaB9D608" ||account === "0xf40b291189aE7F917c39D0B7e327E0A929c9952c" || account === "0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9") {
      setUsertype("doctor");
    } else {
      setUsertype("patient");
    }
    const fetchData = async () => {
      try {
        const pDetails = await contract.getPatientDetails(account);
        setPatientDetails(pDetails.slice(1, 5));
      } catch (e) {
        console.log(e);
      }
    };
    const getData = async () => {
      const data = await contract.getDoctorDetails(account);
      console.log(data);
      setData(data);
    };
    if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906" || account === "0x597875bcA8d92C79Cbbc735A90aD25b8CaB9D608" || account === "0xf40b291189aE7F917c39D0B7e327E0A929c9952c" || account === "0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9") {
      getData();
    } else {
      fetchData();
    }
  }, [account, contract]);

  return (
    <>
      {usertype === "patient" ? (
        <HStack align={"center"} justify={"center"}>
          <Card maxW="lg" align="center">
            <CardBody>
              <Image
                src="https://thumbs.dreamstime.com/b/judge-simple-flat-vector-personal-profile-icon-symbol-people-concept-illustration-246675256.jpg"
                alt="Green double couch with wooden legs"
                borderRadius="md"
                width={400}
                height={300}
                style={{ alignItems: "center", marginLeft: "30px" }}
              />
              <Stack mt="6" spacing="3" align="center">
                <Heading size="md">User Type : {usertype} </Heading>
                <Heading size="md">Name : {patientDetails[0]}</Heading>
                <Heading size="md"> age : {patientDetails[1]}</Heading>
                <Heading size="md"> weight : {patientDetails[2]}</Heading>
                <Heading size="md"> height : {patientDetails[3]}</Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Link to="">
                  {" "}
                  <Button variant="solid" colorScheme="blue">
                    View Cases
                  </Button>
                </Link>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </HStack>
      ) : (
        <HStack align={"center"} justify={"center"}>
          <Card maxW="lg" align="center">
            <CardBody>
              <Image
                src="/doco.jpg"
                alt="Green double couch with wooden legs"
                borderRadius="md"
                width={400}
                height={300}
                style={{ alignItems: "center", marginLeft: "30px" }}
              />
              <Stack mt="6" spacing="3" align="center">
                <Heading size="md">Name : {data[0]} </Heading>
                <Heading size="md">Doctor Id : 1</Heading>
                <Heading size="md">Specialism : {data[2]}</Heading>
                <Heading size="md">
                  Total Number of Patients : {data[3]?.length}
                </Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Link to="">
                  {" "}
                  <Button variant="solid" colorScheme="blue">
                    View Cases
                  </Button>
                </Link>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </HStack>
      )}
    </>
  );
};

export default Profile;
