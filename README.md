# Decentralized Microfinance Platform

This project is a basic decentralized microfinance platform built on the Base blockchain. It allows users to create and repay loans, with loan details managed through smart contracts.

## Features

- Create loans with a specified amount, interest rate, and duration.
- Repay loans with interest before the due date.
- View loan status.

## Getting Started

### Prerequisites

- Node.js and npm
- MetaMask wallet extension
- Hardhat for contract deployment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yarnik1/base-microfinance-platform.git
   ```

2. Install dependencies for contracts:
   ```bash
   cd contracts
   npm install
   ```

3. Compile the smart contracts:
   ```bash
   npx hardhat compile
   ```

4. Deploy the contract to the Base network (configure the network in Hardhat).

5. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

6. Run the frontend:
   ```bash
   npm run dev
   ```

7. Open your web browser and go to `http://localhost:3000`.

## Usage

1. Connect your MetaMask wallet.
2. Create a new loan by specifying the loan amount, interest rate, and duration.
3. Repay the loan using the provided interface.

## License

This project is licensed under the MIT License.
