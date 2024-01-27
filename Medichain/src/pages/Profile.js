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
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await contract.getDoctorDetails(account);
      console.log(data);
      setData(data);
    };
    getData();
  }, []);

  return (
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
            <Heading size="md">DoctorId : 1</Heading>
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
  );
};

export default Profile;
