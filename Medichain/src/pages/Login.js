import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, FirebaseAuth } from "../firebase/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContract } from "../context/context";
import { useNavigate } from "react-router";
import { ethers } from "ethers";
import MeddyJSON from "../constants/Meddy.json";
import { getDocs, query, where } from "firebase/firestore";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { authData } = useContract();
  // console.log(authData);
  const [todo, setTodo] = useState("");

  const {
    account,
    setAccount,
    contract,
    setContract,
    userType,
    setUserType,
    provider,
    setProvider,
  } = useContract();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [usertype, setUsertype] = useState("");

  // const signup = async () => {
  //   const googleProvider = new GoogleAuthProvider();
  //   await signInWithPopup(FirebaseAuth, googleProvider).then((data) =>
  //     console.log(data)
  //   );
  // };

  const emailExists = async (email) => {
    // const profilesRef = collection(db, "profiles");
    // const querySnapshot = await getDocs(query(profilesRef, where("email", "==", email)));
    // if(querySnapshot)
    //   console.log(querySnapshot)
    // return !querySnapshot.empty;

    const res = await getDocs(collection(db, "profiles"));
    for (let i = 0; i < res.docs.length; i++) {
      if (res?.docs[i]?.data()?.email == email) {
        console.log("Hello", res?.docs[i]?.data()?.userType);
        setUserType(res?.docs[i]?.data()?.userType);
        console.log("Hello", userType);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const get = async () => {
      const emailAlreadyExists = await emailExists(authData?.email);
      if (emailAlreadyExists) {
        navigate("/Dashboard");
      }
    };

    get();
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "profiles"), {
        name: authData?.displayName,
        email: authData?.email,
        age: age,
        weight: weight,
        height: height,
        metamaskAddress: metamaskAddress,
        userType: usertype,
      });
      setAccount(metamaskAddress);
      console.log("Document written with ID: ", docRef.id);
      toast({
        position: "top",
        title: "Details saved successfully",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
      setUserType(usertype);
      navigate("/Dashboard");

      // setting up contract
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // try {
      //   if (provider) {
      //     const signer = provider.getSigner();
      //     const address = await signer.getAddress();
      //     setAccount(address);
      //     const contract = new ethers.Contract(
      //       MeddyJSON.address,
      //       MeddyJSON.abi,
      //       signer
      //     );
      //     console.log(contract);
      //     setContract(contract);

      //   }
      // } catch (error) {
      //   toast({
      //     position: "top",
      //     title: "Error While Connecting With Metamask",
      //     status: "error",
      //     duration: 1500,
      //     isClosable: true,
      //   });
      // }
    } catch (e) {
      toast({
        position: "top",
        title: "Error while saving details",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="todo-container">
      {/* <div className="todo">
        <button onClick={signup}>Sign Up</button>
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              placeholder="What do you have to do today?"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">...</div>
      </div> */}

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign Up</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              <Text color={"blue.400"}>Only for the 1st time</Text>
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            style={{ width: "460px" }}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="text" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  isDisabled
                  value={authData?.displayName}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  isDisabled
                  value={authData?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="number" isRequired>
                <FormLabel>Age</FormLabel>
                <Input type="number" onChange={(e) => setAge(e.target.value)} />
              </FormControl>
              <FormControl id="number" isRequired>
                <FormLabel>Height(in Cm.)</FormLabel>
                <Input
                  type="number"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </FormControl>
              <FormControl id="number" isRequired>
                <FormLabel>Weight(in Kgs.)</FormLabel>
                <Input
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </FormControl>
              <FormControl id="text" isRequired>
                <FormLabel>Metamask Address</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setMetamaskAddress(e.target.value)}
                />
              </FormControl>

              <FormControl colSpan={[6, 3]} isRequired>
                <FormLabel>User Type</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setUsertype(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={signIn}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </section>
  );
};

export default Login;
