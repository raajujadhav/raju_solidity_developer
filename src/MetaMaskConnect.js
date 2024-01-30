import React, { useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const MetaMaskConnect = () => {
  const [connected, setConnected] = useState(false);

  const connectToMetaMask = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: "eth_requestAccounts" });
        const ethereum = window.ethereum;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("Connected to MetaMask with address:", address);
        setConnected(true);
      } else {
        console.error("MetaMask extension not detected");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      ) : (
        <p>Connected to MetaMask!</p>
      )}
    </div>
  );
};

export default MetaMaskConnect;
