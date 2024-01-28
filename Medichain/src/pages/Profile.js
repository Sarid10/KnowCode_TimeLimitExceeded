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
import { collection, addDoc } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { db, FirebaseAuth } from "../firebase/firebase-config";

const Profile = () => {
  const { account, contract } = useContract();
  const [usertype, setUsertype] = useState("");
  const [patientDetails, setPatientDetails] = useState([]);
  const [data, setData] = useState([]);
  const [doc, setDoc] = useState([]);
  useEffect(() => {
    // if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906" || account === "0x597875bcA8d92C79Cbbc735A90aD25b8CaB9D608" ||account === "0xf40b291189aE7F917c39D0B7e327E0A929c9952c" || account === "0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9") {
    //   setUsertype("doctor");
    // } else {
    //   setUsertype("patient");
    // }
    // const fetchData = async () => {
    //   try {
    //     const pDetails = await contract.getPatientDetails(account);
    //     setPatientDetails(pDetails.slice(1, 5));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // const getData = async () => {
    //   const data = await contract.getDoctorDetails(account);
    //   console.log(data);
    //   setData(data);
    // };
    // if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906" || account === "0x597875bcA8d92C79Cbbc735A90aD25b8CaB9D608" || account === "0xf40b291189aE7F917c39D0B7e327E0A929c9952c" || account === "0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9") {
    //   getData();
    // } else {
    //   fetchData();
    // }
    const getData = async () => {
      const res = await getDocs(collection(db, "profiles"));
      for (let i = 0; i < res.docs.length; i++) {
        if (res?.docs[i]?.data()?.email == "manavshah1104@gmail.com") {
          setDoc(res?.docs[i]?.data());
        }
      }
    };
    getData();
    console.log(doc);
  }, [account, contract]);

  return (
    <>
      {usertype === "Patient" ? (
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
                <Heading size="md">User Type : {doc?.userType} </Heading>
                <Heading size="md">Name : {doc?.name}</Heading>
                <Heading size="md"> age : {doc?.age}</Heading>
                <Heading size="md"> weight : {doc?.weight}</Heading>
                <Heading size="md"> height : {doc?.height}</Heading>
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
                <Heading size="md">Name : {doc?.name} </Heading>
                <Heading size="md">Doctor Id : 12</Heading>
                <Heading size="md">Specialism : Skin Disease</Heading>
                <Heading size="md">
                  Total Number of Patients : {doc?.length}
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
