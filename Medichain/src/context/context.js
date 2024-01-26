import { createContext, useContext, useState } from "react";

const EVaultContext = createContext(null);

export const useVault = () => useContext(EVaultContext);

export const EVaultProvider = (props) => {
  const [userType, setUserType] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [caseCount, setCaseCount] = useState(-1);

  return (
    <EVaultContext.Provider
      value={{
        account,
        setAccount,
        contract,
        setContract,
        provider,
        setProvider,
        userType, 
        setUserType,
        caseCount,
        setCaseCount
      }}
    >
      {props.children}
    </EVaultContext.Provider>
  );
};
