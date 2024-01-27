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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906") {
          setUsertype("doctor");
        } else {
          setUsertype("patient");
          const pDetails = await contract.getPatientDetails(account);
          setPatientDetails(pDetails.slice(1, 5));
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
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
        <div>hello</div>
      )}
    </>
  );
};

export default Profile;
