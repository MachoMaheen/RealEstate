Here's a **README** file for your project **Vrishti 2.0**:

---

# Vrishti 2.0 - Real Estate NFT & Escrow System

**Vrishti 2.0** is a blockchain-based platform designed to simplify and secure real estate transactions. It leverages NFTs (ERC-721 tokens) to represent real estate properties and uses a smart contract-based escrow system to ensure transparency, security, and efficiency in property sales.

## Features

- **NFT Representation of Property**: Each property is tokenized as an NFT using the ERC-721 standard, ensuring unique and immutable ownership records.
- **Blockchain-Powered Transactions**: Transactions are recorded on the Ethereum blockchain, providing transparency and security.
- **Escrow System**: A secure, smart contract-based escrow system holds funds until all parties approve the transaction.
- **Automated Processes**: The platform automates key processes, such as listing properties, executing sales, and finalizing transactions, reducing the need for intermediaries.
- **Decentralized**: All interactions, from minting NFTs to finalizing sales, are decentralized and trustless.

## Technologies Used

1. **Blockchain**: Ethereum blockchain for immutable, transparent, and secure property transactions.
2. **NFTs (ERC-721 Tokens)**: For unique representation of real estate properties.
3. **Web3.js**: For blockchain interactions within the React frontend.
4. **Smart Contracts (Solidity)**: Deployed on Ethereum to handle the logic of minting NFTs and managing the escrow process.
5. **React**: For creating a dynamic and responsive user interface.

## How It Works

1. **Minting an NFT**: 
   - The seller mints an NFT, representing the property, by entering a valid Token URI. 
   - Once minted, the buyer address, purchase price, and escrow amount are automatically populated.

2. **Listing on Escrow**:
   - The seller lists the NFT on the platform for sale. 
   - The buyer deposits funds into the escrow, and once all parties approve, the smart contract executes the sale.

3. **Finalizing the Sale**: 
   - Once the sale is approved by all parties (buyer, seller, inspector, and lender), the transaction is finalized, and the property is transferred to the new owner.

## Installation

To run Vrishti 2.0 locally:

1. Clone the repository:

```bash
git clone https://github.com/your-username/vrishti-2.0.git
```

2. Install dependencies:

```bash
cd vrishti-2.0
npm install
```

3. Run the app:

```bash
npm start
```

## Running the Smart Contracts

Since we encountered some issues with the system, the smart contracts were tested and executed using **Remix IDE**. You can copy the contract code from the `/contracts` folder and deploy it using Remix with the following steps:

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Create new files and paste the contract code from the project.
3. Compile and deploy the contracts on an Ethereum test network (such as Ropsten or Rinkeby).
4. Interact with the contracts using the deployed addresses.

## Usage

1. **Minting an NFT**: Enter the Token URI and click "Mint NFT." The fields for NFT ID, Buyer Address, and Purchase Price will be populated automatically.
2. **Listing on Escrow**: Fill in the necessary details and list the NFT for sale. After listing, a video will be played, and the NFT details will be displayed.
3. **Approve and Finalize Sale**: Approve the sale and finalize it once all parties have confirmed the transaction.

## Project Structure

- **src/components**: Contains the main React components.
- **src/contracts**: Smart contracts written in Solidity.
- **public/video**: The video that plays during the listing process.

## Challenges We Faced

- **Integrating NFTs with Real Estate**: Translating real estate ownership into NFTs required aligning smart contracts with real-world property rules.
- **Dynamic Metadata Handling**: Managing metadata like purchase price, buyer, and escrow dynamically for NFTs was resolved by linking off-chain metadata to a Token URI.
- **Web3 Integration**: Handling account changes and network errors was challenging, but we added error handling and event listeners to resolve this.

## Future Improvements

- **Legal Integration**: Integrating the platform with legal frameworks to ensure NFT-based ownership is recognized in legal jurisdictions.
- **Cross-chain Capabilities**: Expanding the platform to support multiple blockchains.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
