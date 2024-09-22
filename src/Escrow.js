// src/Escrow.js

import Web3 from 'web3';
import EscrowABI from '../src/abis/Escrow.json'; // Replace with actual path to your Escrow ABI
import RealEstateABI from '../src/abis/RealEstate.json'; // Replace with actual path to your RealEstate ABI

// Contract addresses (replace with your deployed contract addresses)
const ESCROW_CONTRACT_ADDRESS = '0xYourEscrowContractAddress';
const REALESTATE_CONTRACT_ADDRESS = '0xYourRealEstateContractAddress';

// Initialize Web3 and request account access
export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    alert('Please install MetaMask to use this feature!');
  }
};

// Get the Escrow contract instance
export const getEscrowContract = async () => {
  const web3 = window.web3;
  return new web3.eth.Contract(EscrowABI, ESCROW_CONTRACT_ADDRESS);
};

// Get the Real Estate contract instance
export const getRealEstateContract = async () => {
  const web3 = window.web3;
  return new web3.eth.Contract(RealEstateABI, REALESTATE_CONTRACT_ADDRESS);
};

// Mint a new NFT (Real Estate)
export const mintNFT = async (tokenURI, account) => {
  const realEstateContract = await getRealEstateContract();
  return await realEstateContract.methods.mint(tokenURI).send({ from: account });
};

// List an NFT on Escrow
export const listNFTOnEscrow = async (nftID, buyer, purchasePrice, escrowAmount, account) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods
    .list(nftID, purchasePrice, escrowAmount, buyer)
    .send({ from: account });
};

// Deposit earnest money into the escrow
export const depositEarnest = async (nftID, escrowAmount, account) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods.depositEarnest(nftID).send({
    from: account,
    value: escrowAmount,
  });
};

// Approve the sale in the Escrow contract
export const approveSale = async (nftID, account) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods.approveSale(nftID).send({ from: account });
};

// Finalize the sale
export const finalizeSale = async (nftID, account) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods.finalizeSale(nftID).send({ from: account });
};

// Get the buyer address for a given NFT ID
export const getBuyerAddress = async (nftID) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods.buyer(nftID).call();
};

// Get the purchase price for a given NFT ID
export const getPurchasePrice = async (nftID) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods.purchasePrice(nftID).call();
};

// Get the escrow amount for a given NFT ID
export const getEscrowAmount = async (nftID) => {
  const escrowContract = await getEscrowContract();
  return await escrowContract.methods.escrowAmount(nftID).call();
};

// Get the token URI for a given NFT ID
export const getTokenURI = async (nftID) => {
  const realEstateContract = await getRealEstateContract();
  return await realEstateContract.methods.tokenURI(nftID).call();
};
