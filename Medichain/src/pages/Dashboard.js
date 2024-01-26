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
  Center,
  HStack,
  Flex,
  useColorModeValue,
  Box,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Dashboard = (props) => {
  const { account, contract, userType } = useVault();
  const navigate = useNavigate();

  useEffect(() => { }, []);

  return (
    <VStack align={"center"} justify={"center"}>
      {userType === "" && (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Box
            border="2px solid cyan"
            bgColor={"cyan.400"}
            borderRadius="50"
            m={20}
            p={10}
          >
            <HStack>
              <Heading>
                <InfoOutlineIcon />
              </Heading>
              <Heading>
                Please Contact the Admin to add you as a new member
              </Heading>
            </HStack>
          </Box>
        </Flex>
      )}

    </VStack>
  );
};

export default Dashboard;
