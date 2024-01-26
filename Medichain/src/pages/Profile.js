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
  useEffect(() => {}, []);

  return (
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
            <Heading size="md">User Type : </Heading>
            <Heading size="md">Name : Advait Yadav</Heading>
            <Heading size="md">Address :</Heading>
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
