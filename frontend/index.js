import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Microfinance from '../contracts/Microfinance.json';

const MicrofinanceApp = () => {
    const [account, setAccount] = useState(null);
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [duration, setDuration] = useState('');
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const loadProvider = async () => {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);
                const accounts = await provider.send('eth_requestAccounts', []);
                setAccount(accounts[0]);

                const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
                const contract = new ethers.Contract(contractAddress, Microfinance.abi, provider.getSigner());
                setContract(contract);
            };
            loadProvider();
        } else {
            alert('Please install MetaMask');
        }
    }, []);

    const createLoan = async () => {
        if (contract) {
            const tx = await contract.createLoan(ethers.utils.parseEther(loanAmount), parseInt(interestRate), parseInt(duration));
            await tx.wait();
            alert('Loan created successfully!');
        }
    };

    return (
        <div>
            <h1>Decentralized Microfinance Platform</h1>
            <p>Connected account: {account}</p>

            <input 
                type="text" 
                placeholder="Loan Amount (ETH)" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Interest Rate (%)" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Duration (seconds)" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
            />
            <button onClick={createLoan}>Create Loan</button>
        </div>
    );
};

export default MicrofinanceApp;
