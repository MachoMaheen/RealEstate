import React, { useState, useEffect } from "react";
import {
  loadWeb3,
  mintNFT,
  listNFTOnEscrow,
  depositEarnest,
  approveSale,
  finalizeSale,
  getTokenURI,
  getBuyerAddress,
  getPurchasePrice,
  getEscrowAmount,
} from "./Escrow";

function App() {
  const [account, setAccount] = useState("");
  const [nftID, setNftID] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [buyer, setBuyer] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [escrowAmount, setEscrowAmount] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [fetchedBuyer, setFetchedBuyer] = useState("");
  const [fetchedPurchasePrice, setFetchedPurchasePrice] = useState("");
  const [fetchedEscrowAmount, setFetchedEscrowAmount] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  // Mint an NFT (Seller)
  const handleMintNFT = async (e) => {
    e.preventDefault();
    try {
      await mintNFT(tokenURI, account);
      alert("NFT minted successfully!");

      // Automatically fill the below values after minting
      setNftID(0); // Hardcoded as per your request
      setBuyer("0xd9a9D3c265a875b0F97C45db50ade3c0a3fbEFd0"); // Hardcoded buyer address
      setPurchasePrice("30000000000000000"); // Hardcoded purchase price in wei
      setEscrowAmount("30000000000000000"); // Hardcoded escrow amount
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  // List NFT on Escrow (Seller)
  const handleListNFT = async (e) => {
    e.preventDefault();
    try {
      await listNFTOnEscrow(nftID, buyer, purchasePrice, escrowAmount, account);
      alert("NFT listed on Escrow successfully!");

      // Play video after listing on Escrow
      setShowVideo(true);

      // Fetch the NFT details after listing
      await fetchNFTDetails();
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  // Fetch NFT details after listing or minting
  const fetchNFTDetails = async () => {
    try {
      const fetchedBuyerAddress = await getBuyerAddress(nftID);
      const fetchedPrice = await getPurchasePrice(nftID);
      const fetchedEscrow = await getEscrowAmount(nftID);

      setFetchedBuyer(fetchedBuyerAddress);
      setFetchedPurchasePrice(fetchedPrice);
      setFetchedEscrowAmount(fetchedEscrow);
    } catch (error) {
      console.error("Error fetching NFT details:", error);
    }
  };

  const handleDepositEarnest = async (e) => {
    e.preventDefault();
    try {
      await depositEarnest(nftID, escrowAmount, account);
      alert("Earnest money deposited!");
    } catch (error) {
      console.error("Error depositing earnest money:", error);
    }
  };

  const handleApproveSale = async () => {
    try {
      await approveSale(nftID, account);
      alert("Sale approved!");
    } catch (error) {
      console.error("Error approving sale:", error);
    }
  };

  const handleFinalizeSale = async () => {
    try {
      await finalizeSale(nftID, account);
      alert("Sale finalized!");
    } catch (error) {
      console.error("Error finalizing sale:", error);
    }
  };

  const fetchTokenMetadata = async () => {
    try {
      const uri = await getTokenURI(nftID);
      const response = await fetch(uri);
      const metadata = await response.json();
      setImageURI(metadata.image); // Assumes image is part of the metadata
    } catch (error) {
      console.error("Error fetching token metadata:", error);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#1c1c1e",
      color: "#ffdd00",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      color: "#ffdd00",
    },
    form: {
      marginBottom: "20px",
    },
    input: {
      backgroundColor: "#2c2c2e",
      color: "#ffdd00",
      border: "1px solid #ffdd00",
      padding: "10px",
      margin: "10px 0",
      fontSize: "16px",
      borderRadius: "5px",
      display: "block",
      width: "100%",
    },
    button: {
      backgroundColor: "#2c2c2e",
      color: "#ffdd00",
      border: "1px solid #ffdd00",
      padding: "10px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "block",
      marginTop: "10px",
      width: "100%",
    },
    image: {
      maxWidth: "300px",
      marginTop: "10px",
      border: "2px solid #ffdd00",
      borderRadius: "5px",
    },
    video: {
      marginTop: "20px",
      maxWidth: "100%",
      height: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Real Estate Escrow System</h1>
      <h3>Your Account: {account}</h3>

      {/* Mint NFT */}
      <form onSubmit={handleMintNFT} style={styles.form}>
        <h2 style={styles.heading}>Mint a New NFT</h2>
        <input
          type="text"
          placeholder="Token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Mint NFT
        </button>
      </form>

      {/* List NFT on Escrow */}
      <form onSubmit={handleListNFT} style={styles.form}>
        <h2 style={styles.heading}>List NFT on Escrow</h2>
        <input
          type="text"
          placeholder="NFT ID"
          value={nftID}
          onChange={(e) => setNftID(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Buyer Address"
          value={buyer}
          onChange={(e) => setBuyer(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Purchase Price (in Wei)"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Escrow Amount (in Wei)"
          value={escrowAmount}
          onChange={(e) => setEscrowAmount(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          List on Escrow
        </button>
      </form>

      {/* Video should be played after listing on Escrow */}
      {showVideo && (
        <video controls style={styles.video}>
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Display fetched NFT details */}
      <h2 style={styles.heading}>NFT Details</h2>
      <p>
        <strong>NFT ID:</strong> {nftID}
      </p>
      <p>
        <strong>Buyer Address:</strong> {fetchedBuyer}
      </p>
      <p>
        <strong>Purchase Price (Wei):</strong> {fetchedPurchasePrice}
      </p>
      <p>
        <strong>Escrow Amount (Wei):</strong> {fetchedEscrowAmount}
      </p>

      {/* Deposit Earnest */}
      <form onSubmit={handleDepositEarnest} style={styles.form}>
        <h2 style={styles.heading}>Deposit Earnest Money</h2>
        <input
          type="text"
          placeholder="NFT ID"
          value={nftID}
          onChange={(e) => setNftID(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Escrow Amount (in Wei)"
          value={escrowAmount}
          onChange={(e) => setEscrowAmount(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Deposit
        </button>
      </form>

      {/* Approve and Finalize Sale */}
      <div>
        <h2 style={styles.heading}>Approve and Finalize Sale</h2>
        <button onClick={handleApproveSale} style={styles.button}>
          Approve Sale
        </button>
        <button onClick={handleFinalizeSale} style={styles.button}>
          Finalize Sale
        </button>
      </div>

      {/* Fetch NFT Metadata */}
      <div>
        <h2 style={styles.heading}>Fetch NFT Metadata</h2>
        <input
          type="text"
          placeholder="NFT ID"
          value={nftID}
          onChange={(e) => setNftID(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchTokenMetadata} style={styles.button}>
          Fetch Metadata
        </button>
        {imageURI && <img src={imageURI} alt="NFT" style={styles.image} />}
      </div>
    </div>
  );
}

export default App;
