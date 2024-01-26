import React, { useEffect, useState } from "react";
import { useVault } from "../context/context";
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
  const [details, setDetails] = useState([]);
  const [caseCount, setCaseCount] = useState(0);
  const { userType, contract, account } = useVault();
  const adminAddress = "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906"
  useEffect(() => {
    const display = async () => {
      if (userType === "Judge") {
        const res = await contract.judges(account);
        const totalCases = await contract.getJudgeCaseIds(account);
        setCaseCount(totalCases.length);
        setDetails(res);
      } else if (userType === "Lawyer") {
        const res = await contract.lawyers(account);
        const totalCases = await contract.getLawyerCaseIds(account);
        setCaseCount(totalCases.length);
        setDetails(res);
      } else if (userType === "Client") {
        const res = await contract.clients(account);
        const totalCases = await contract.getClientCaseIds(account);
        setCaseCount(totalCases.length);
        setDetails(res);
      }
    };
    display();
  }, []);

  function trimAddress(address, visibleChars = 8) {
    if (!address || address.length <= visibleChars * 2) {
      return address;
    }

    const start = address.substring(0, visibleChars);
    const end = address.substring(address.length - visibleChars);

    return `${start}...${end}`;
  }
  return (
    <HStack align={"center"} justify={"center"}>
      {userType !== "" && (
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
              <Heading size="md">User Type : {userType}</Heading>
              <Heading size="md">Name : {userType === "Admin" ? "Admin" : details[1]}</Heading>
              <Heading size="md">Address : {userType === "Admin" ? trimAddress(adminAddress) : trimAddress(details[0])}</Heading>
              {
                userType !== "Admin" && (
                  <Heading size="md">Number of Active Cases : {caseCount}</Heading>
                )
              }
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
      )}
    </HStack>
  );
};

export default Profile;
