import React, { useEffect } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Textarea,
  Toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useContract } from "../context/context";
import { ethers } from "ethers";

const Diagnose = ({ onSuccess }) => {
  const toast = useToast();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const { account, contract } = useContract();
  const [url, setUrl] = useState("");
  const [PatientAddress, setPatientAddress] = useState("");
  const [fees, setFees] = useState("");
  const [disease, setDisease] = useState("");
  const [drugs, setDrugs] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    console.log(e.target.files[0].name);
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "e8b143c571986d7b7074",
            pinata_secret_api_key:
              "c60fe4549b60ae8f8dae9402ca841df7307d7947fbb90363cd7250b16d4cff8d",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log("Image hash: ", ImgHash);
        setUrl(ImgHash);
        toast({
          position: "top",
          title: "Document Uploaded Successfully",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        setFileName("No image Uploaded");
        setFile(null);
      } catch (e) {
        alert(e);
      }
    }
  };

  const diag = async () => {
    try {
      await contract.diagnosePatient(
        PatientAddress,
        caseNo,
        disease,
        drugs,
        url,
        fees
      );

      toast({
        position: "top",
        title: "Diagnosed Successfully",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        position: "top",
        title: "Error While Diagnosing",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.log(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {" "}
            PATIENT REPORT
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <FormControl id="title" isRequired>
                <FormLabel>Case Number</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setCaseNo(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl id="title" isRequired>
                <FormLabel>Patient Address</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setPatientAddress(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Disease Image </FormLabel>
                <Input
                  type="file"
                  id="file-upload"
                  name="data"
                  onChange={retrieveFile}
                />
              </FormControl>
              <Stack spacing={10} pt={7}>
                <Button
                  onClick={handleSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Upload
                </Button>
              </Stack>
            </HStack>
            <HStack>
              <FormControl id="title" isRequired>
                <FormLabel>Consultancy Fees</FormLabel>
                <Input type="text" onChange={(e) => setFees(e.target.value)} />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl id="desc" isRequired>
                <FormLabel>Disease</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setDisease(e.target.value)}
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl id="desc" isRequired>
                <FormLabel>Drugs</FormLabel>
                <Input type="text" onChange={(e) => setDrugs(e.target.value)} />
              </FormControl>
            </HStack>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={diag}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Add
              </Button>
            </Stack>
            <Stack pt={6}></Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Diagnose;
