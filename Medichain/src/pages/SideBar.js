import { Heading, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import {
  useLocation,
  Route,
  Routes,
  useNavigate,
  Navigate,
  Link,
} from "react-router-dom";
import { useContract } from "../context/context";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  useDisclosure,
  DrawerContent,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import Cases from "./Diagnose";
import Dashboard from "./Dashboard";

// // LinkItemProps
// const LinkItemProps = {
//   name: 'string',
//   icon: 'IconType',
// };

// NavItemProps
const NavItemProps = {
  icon: "IconType",
  children: "React.ReactNode",
};

// MobileProps
const MobileProps = {
  onOpen: () => { },
};

// SidebarProps
const SidebarProps = {
  onClose: () => { },
};

// let LinkItems: Array<LinkItemProps> = []

// if(userType === 'Admin') {
//   LinkItems = [
//     { name: 'Dashboard', icon: FiHome },
//     { name: 'Cases', icon: FiStar },
//     { name: 'Judge', icon: FiStar },
//     { name: 'Lawyer', icon: FiStar },
//     { name: 'Client', icon: FiStar },
//     { name: 'Profile', icon: FiSettings },
//   ]
// }
// else if(userType === 'Judge') {
//   LinkItems = [
//     { name: 'Dashboard', icon: FiHome },
//     { name: 'Cases', icon: FiStar },
//     { name: 'Profile', icon: FiSettings },
//   ]
// }
// else if(userType === 'Lawyer') {
//   LinkItems = [
//     { name: 'Dashboard', icon: FiHome },
//     { name: 'Cases', icon: FiStar },
//     { name: 'Profile', icon: FiSettings },
//   ]
// }
// else if(userType === 'Client') {
//   LinkItems = [
//     { name: 'Dashboard', icon: FiHome },
//     { name: 'Cases', icon: FiStar },
//     { name: 'Profile', icon: FiSettings },
//   ]
// }

// original
// const LinkItems: Array<LinkItemProps> = [
//   { name: 'Dashboard', icon: FiHome },
//   { name: 'Cases', icon: FiStar },
//   { name: 'Judge', icon: FiStar },
//   { name: 'Lawyer', icon: FiStar },
//   { name: 'Client', icon: FiStar },
//   { name: 'Profile', icon: FiSettings },
// ]

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  // const { userType } = useContract();
  const [usertype, setUsertype] = useState("")
  const { account ,userType} = useContract();
  // useEffect(()=>{

  //   // if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906" || account === "0x597875bcA8d92C79Cbbc735A90aD25b8CaB9D608" ||account === "0xf40b291189aE7F917c39D0B7e327E0A929c9952c" || account === "0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9") {
  //   //   setUsertype("Doctor");
  //   // } else {
  //   //   setUsertype("Patient");
  //   }
  // }, [])

  // LinkItemProps
  const LinkItemProps = {
    name: "string",
    icon: "IconType",
  };

  let LinkItems: Array<LinkItemProps> = [];

  if (userType === "Doctor") {
    LinkItems = [
      { name: "Dashboard", icon: FiHome },
      { name: "Diagnose", icon: FiStar },
      { name: "Patient", icon: FiStar },
      { name: "Articles", icon: FiStar },
      { name: "Profile", icon: FiSettings },
    ];
  } else if (userType === "Patient") {
    LinkItems = [
      { name: "Dashboard", icon: FiHome },
      { name: "Medical_History", icon: FiStar },
      { name: "Disease", icon: FiStar },
      { name: "Articles", icon: FiStar },
      { name: "Consult", icon: FiStar },
      { name: "Profile", icon: FiSettings },
    ];
  }

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src="/mediChain_icon.svg" style={{ width: "45px" }}></img>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          MediChain
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link to={`/${children}`}>
      <Box
        as="a"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const [usertype, setUsertype] = useState("")
  const { account,userType } = useContract();
  useEffect(()=>{

    if (account === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906" || account === "0x597875bcA8d92C79Cbbc735A90aD25b8CaB9D608" ||account === "0xf40b291189aE7F917c39D0B7e327E0A929c9952c" || account === "0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9") {
      setUsertype("doctor");
    } else {
      setUsertype("patient");
    }
  }, [])

  const navigate = useNavigate();
  const toast = useToast();

  const signOutOfMetamask = () => {
    navigate("/");

    toast({
      position: "top",
      title: "Logged Out Successfully",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        E-Vault
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">You</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userType}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={signOutOfMetamask}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SideBar = (props) => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    if (location.state) {
      setAddress(location.state.address);
      setBalance(location.state.Balance);
    }
    // console.log(balance);
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {props.children}
      </Box>
    </Box>

    // </div>
  );
};

export default SideBar;
