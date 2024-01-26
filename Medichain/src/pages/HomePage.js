import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import { useVault } from "../context/context";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { ChatIcon } from "@chakra-ui/icons";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    account,
    setAccount,
    contract,
    setContract,
    provider,
    setProvider,
    userType,
    setUserType,
  } = useVault();

  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  const toast = useToast();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    // async function initializeModel() {
    //   const a = await model.generateContent("'user_agent': 'Personalized AI healthcre assistance'");
    //   console.log(a);
    // }
    // initializeModel()
    // console.log("done");
  }, []);

  // const getbalance = (address) => {
  //   // Requesting balance method
  //   window.ethereum
  //     .request({
  //       method: "eth_getBalance",
  //       params: [address, "latest"],
  //     })
  //     .then((balance) => {
  //       // Setting balance
  //       setdata({
  //         Balance: ethers.formatEther(balance),
  //       });
  //     });
  // };

  // const accountChangeHandler = (account) => {
  //   // Setting an address data
  //   setdata({
  //     address: account,
  //   });

  //   // Setting a balance
  //   getbalance(account);
  // toast({
  //   position: "top",
  //   title: "Connected With Metamask Successfully",
  //   status: "success",
  //   duration: 1500,
  //   isClosable: true,
  // });
  //   navigate("Dashboard", {
  //     state: { address: data["address"], Balance: data["Balance"] },
  //   });
  // };

  const requestMetaMaskAccess = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      if (provider) {
        // window.ethereum
        //   .request({ method: "eth_requestAccounts" })
        //   .then((res) => accountChangeHandler(res[0]))
        //   .catch((err) => {
        //     console.log(err);
        //     toast({
        //       position: "top",
        //       title: "Error While Connecting With Metamask",
        //       status: "error",
        //       duration: 1500,
        //       isClosable: true,
        //     });
        //   });
        await provider.send("eth_requestAccounts", []);

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        toast({
          position: "top",
          title: "Connected With Metamask Successfully",
          status: "success",
          duration: 1500,
          isClosable: true,
        });

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contractAddress = "0x87551c462e1E99baf441c101971fAd5DAA397f8C";
        const abi = [
          {
            inputs: [
              {
                internalType: "string",
                name: "_name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "_doctorId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "_specialism",
                type: "string",
              },
            ],
            name: "addDoctor",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "string",
                name: "_name",
                type: "string",
              },
              {
                internalType: "uint16",
                name: "_age",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "_weight",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "_height",
                type: "uint16",
              },
            ],
            name: "addPatient",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_patient",
                type: "address",
              },
              {
                internalType: "string",
                name: "_diseaseName",
                type: "string",
              },
              {
                internalType: "string",
                name: "_drugName",
                type: "string",
              },
              {
                internalType: "string",
                name: "_imgurl",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "_charges",
                type: "uint256",
              },
            ],
            name: "diagnosePatient",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_doctor",
                type: "address",
              },
            ],
            name: "DOCTOR_NOT_FOUND",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_referredDoctor",
                type: "address",
              },
              {
                internalType: "address",
                name: "_patient",
                type: "address",
              },
            ],
            name: "grantAccess",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "INSUFFICIENT_CONSULTANCYFEE",
            type: "error",
          },
          {
            inputs: [],
            name: "NOT_AUTHORIZED",
            type: "error",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_patient",
                type: "address",
              },
            ],
            name: "PATIENT_NOT_FOUND",
            type: "error",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "patient",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "doctor",
                type: "address",
              },
              {
                indexed: false,
                internalType: "string",
                name: "disease",
                type: "string",
              },
              {
                indexed: false,
                internalType: "string",
                name: "drug",
                type: "string",
              },
            ],
            name: "Diagnosis",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_patient",
                type: "address",
              },
              {
                internalType: "address",
                name: "_doctor",
                type: "address",
              },
            ],
            name: "removeAccess",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "doctors",
            outputs: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "doctorId",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "specialism",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_doctor",
                type: "address",
              },
            ],
            name: "getDoctorDetails",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "",
                type: "string",
              },
              {
                internalType: "address[]",
                name: "",
                type: "address[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_patient",
                type: "address",
              },
            ],
            name: "getPatientDetails",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "",
                type: "string",
              },
              {
                internalType: "uint16",
                name: "",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "",
                type: "uint16",
              },
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "case_no",
                    type: "uint256",
                  },
                  {
                    internalType: "string",
                    name: "diseaseName",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "drugName",
                    type: "string",
                  },
                  {
                    internalType: "string",
                    name: "imgurl",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "doctor",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "consultancyFees",
                    type: "uint256",
                  },
                ],
                internalType: "struct Meddy.MedicalRecord[]",
                name: "",
                type: "tuple[]",
              },
              {
                internalType: "address[]",
                name: "",
                type: "address[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "patients",
            outputs: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint16",
                name: "age",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "weight",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "height",
                type: "uint16",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ];
        const contractAbi = abi;
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        console.log(contract);
        setContract(contract);

        setProvider(signer);
        if (address === "0x46A2A666fc06681e2cB49440a0776a6C4Cc21906") {
          setUserType("Doctor");
          navigate("Dashboard");
        } else {
          setUserType("Patient");
          navigate("Dashboard");
        }
      } else {
        toast({
          position: "top",
          title: "Install Metamask Extension",
          status: "warning",
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        position: "top",
        title: "Error While Connecting With Metamask",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const onLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onExercisesClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='popularExercisesSection']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onTrainers1Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='trainers']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onButton1Click = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='popularExercisesSection']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const subscribeToEmail = () => {};

  const chatBotResponse = async (e) => {
    e.preventDefault();
    console.log(input);

    const op = await getResponse(
      input +
        ".\nGenerate Content in numbered points and one liners around 20 - 25 words."
    );
    console.log(op);
  };

  async function getResponse(inp) {
    const result = await model.generateContent(inp);
    const response = await result.response;
    const text = response.text();
    setOutput(text);
    // console.log(output);
    return text;
  }

  const onNewsClick = () => {
    navigate("/news");
  };
  const onAssistantClick = () => {
    navigate("/assistant");
  };

  return (
    <div className={styles.fitnesslandingpage}>
      <div className={styles.navbar}>
        <div className={styles.nav}>
          <button className={styles.logo} onClick={onLogoClick}>
            <img
              style={{ height: "5vw" }}
              alt=""
              src="/mediChain_icon_inverted.svg"
            />
          </button>
          <div className={styles.menuright}>
            <div className={styles.menulinks}>
              <button
                className={styles.exercises}
                style={{ fontSize: "180%" }}
                onClick={onAssistantClick}
              >
                <ChatIcon /> ASK US
              </button>
              <button
                className={styles.exercises}
                style={{ fontSize: "180%" }}
                onClick={onNewsClick}
              >
                NEWS
              </button>
              <button
                className={styles.login}
                style={{ fontSize: "180%" }}
                onClick={requestMetaMaskAccess}
              >
                LOGIN WITH METAMASK
              </button>
            </div>
            <button className={styles.hamburgerIcon}>
              <img className={styles.group2Icon} alt="" src="/group2.svg" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.herosection}>
        <div className={styles.herotext}>
          <div className={styles.herocta}>
            <div className={styles.title}>
              <p className={styles.cardio}>{``}</p>
              <p style={{ fontSize: "150px" }}>MediChain</p>
            </div>
            <div className={styles.subtitle}>
              Empowering Health with Trust: Decentralized Patient Records,
              Transparent Drug Supply Chains, and AI-Powered Wellness
              Assistance.
            </div>
            <div className={styles.buttonrow}>
              <button className={styles.button} onClick={requestMetaMaskAccess}>
                <div className={styles.getStarted}>Get Started</div>
              </button>
              <button
                className={styles.button1}
                onClick={requestMetaMaskAccess}
              >
                <div className={styles.getStarted}>Preview</div>
              </button>
            </div>
          </div>
        </div>
        {/* <img className={styles.heroimageIcon} alt="" src="/documents.jpg" /> */}
        <video
          width="640"
          height="360"
          className={styles.heroimageIcon}
          autoPlay
          loop
          muted
        >
          <source src="/doc.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className={styles.popularexercisessection}
        data-scroll-to="popularExercisesSection"
      >
        <div className={styles.popularexercises}>
          <div className={styles.title1}>
            <div className={styles.popularExercises}>Features</div>
          </div>

          <div className={styles.exercisecards}>
            <div className={styles.column1}>
              <div className={styles.exercisecard}>
                <img
                  className={styles.cardimageIcon}
                  alt=""
                  src="/blockchain.jpg"
                />
                <div className={styles.text}>
                  <div className={styles.titles}>
                    <div className={styles.popularExercises}>
                      Blockchain-Based Security
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.exercisecard}>
                <img className={styles.imageIcon} alt="" src="/interface.jpg" />
                <div className={styles.text}>
                  <div className={styles.titles}>
                    <div className={styles.popularExercises}>
                      User-Friendly Interfaces
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column1}>
              <div className={styles.exercisecard2}>
                <img className={styles.imageIcon} alt="" src="/privacy.jpg" />
                <div className={styles.text}>
                  <div className={styles.titles}>
                    <div className={styles.popularExercises}>
                      Privacy and Confidentiality
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.exercisecard}>
                <img className={styles.imageIcon} alt="" src="/safeguard.jpg" />
                <div className={styles.text}>
                  <div className={styles.titles}>
                    <div className={styles.popularExercises}>
                      Safeguards Patient Data
                    </div>
                    {/* <div
                      className={styles.subtitles}
                    >{`Feature 5 Description`}</div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column1}>
              <div className={styles.exercisecard2}>
                <img className={styles.imageIcon} alt="" src="/scalable.jpg" />
                <div className={styles.text}>
                  <div className={styles.titles}>
                    <div className={styles.popularExercises}>
                      Scalability and Adaptability
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.exercisecard}>
                <img
                  className={styles.imageIcon}
                  alt=""
                  src="/transparency.jpg"
                />
                <div className={styles.text}>
                  <div className={styles.titles}>
                    <div className={styles.popularExercises}>Transparency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.trainers1} data-scroll-to="trainers">
        <div className={styles.trainerscta}>
          <div className={styles.ctaframe}>
            <div className={styles.background} />
            <div className={styles.title5}>
              <h2 className={styles.workoutProgramMadeContainer}>
                <p className={styles.cardio}>Enabling</p>
                <p className={styles.cardio}>Health</p>
                <p className={styles.cardio}>with</p>
                <p className={styles.cardio}>Trust</p>
              </h2>
              <img className={styles.splashIcon} alt="" src="/splash.svg" />
            </div>
            <div className={styles.description}>
              <div className={styles.loremIpsumDolor}>
                Decentralized Patient Records, Transparent Drug Supply Chains,
                and AI-Powered Wellness Assistance.
              </div>
              <button
                className={styles.button2}
                onClick={requestMetaMaskAccess}
              >
                <div className={styles.getStarted1}>Get Started</div>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.trainersimages}>
          <div className={styles.desktop}>
            <div className={styles.trainer3}>
              <img className={styles.trainer3Child} alt="" src="/patient.jpg" />
              <div className={styles.samanthaWilliam}>Patient</div>
            </div>
            <div className={styles.trainer2}>
              <img
                className={styles.trainer3Child}
                alt=""
                src="/interaction.jpg"
              />
              <div className={styles.samanthaWilliam}>Healthcare</div>
            </div>
            <div className={styles.trainer11}>
              <img className={styles.trainer1Child} alt="" src="/doctors.jpg" />
              <div className={styles.jonathanWise}>Doctors</div>
            </div>
          </div>
          <div className={styles.tablet}>
            <div className={styles.trainer31}>
              <img className={styles.trainer3Item} alt="" src="/doctors.jpg" />
              <div className={styles.karenSummer1}>Doctors</div>
            </div>
            <div className={styles.trainer21}>
              <img
                className={styles.trainer2Item}
                alt=""
                src="/interaction.jpg"
              />
              <div className={styles.jonathanWise1}>Healthcare</div>
            </div>
            <div className={styles.trainer12}>
              <img className={styles.trainer1Item} alt="" src="/patient.jpg" />
              <div className={styles.samanthaWilliam1}>Patient</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.categoriessection}>
        <div className={styles.popularexercises}>
          <div className={styles.category}>
            <div className={styles.div6}>01</div>
            <div className={styles.action}>
              <div className={styles.titles3}>
                <div className={styles.title6}>Login With Metamask</div>
              </div>
            </div>
          </div>
          <img className={styles.separatorIcon} alt="" src="/separator.svg" />
          <div className={styles.category}>
            <div className={styles.div6}>02</div>
            <div className={styles.action}>
              <div className={styles.titles3}>
                <div className={styles.title6}>Update Profile</div>
                {/* <div className={styles.courses}>some description</div> */}
              </div>
            </div>
          </div>
          <img className={styles.separatorIcon} alt="" src="/separator.svg" />
          <div className={styles.category}>
            <div className={styles.div6}>03</div>
            <div className={styles.action}>
              <div className={styles.titles3}>
                <div className={styles.title6}>Doctor Diagnoses</div>
                {/* <div className={styles.courses}>some description</div> */}
              </div>
            </div>
          </div>
          <img className={styles.separatorIcon} alt="" src="/separator.svg" />
          <div className={styles.category}>
            <div className={styles.div6}>04</div>
            <div className={styles.action}>
              <div className={styles.titles3}>
                <div className={styles.title6}>Sends Report</div>
                {/* <div className={styles.courses}>some description</div> */}
              </div>
            </div>
          </div>
          <img className={styles.separatorIcon} alt="" src="/separator.svg" />
          <div className={styles.category}>
            <div className={styles.div6}>05</div>
            <div className={styles.action}>
              <div className={styles.titles3}>
                <div className={styles.title6}>
                  Patients Can View Medical History
                </div>
                {/* <div className={styles.courses}>some description</div> */}
              </div>
            </div>
          </div>
          <img className={styles.separatorIcon} alt="" src="/separator.svg" />
        </div>
      </div>
      <div className={styles.subscribe}>
        <div className={styles.subscribeform}>
          <div className={styles.title11}>Connect With Us</div>
          <form className={styles.form} id="formID">
            <input
              className={styles.input}
              placeholder="Email"
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className={styles.button3}
              type="submit"
              form="formID"
              onClick={chatBotResponse}
            >
              <div className={styles.getStarted1}>Subscribe</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
