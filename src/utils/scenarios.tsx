// the code to create scenarios

import { useState } from "react";
import axios from "axios";
import snapshot from '@snapshot-labs/snapshot.js';
import { getAccount } from '@wagmi/core'
import { Web3Provider } from '@ethersproject/providers';

const Scenarios = (props) => {  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/imagine-scenarios");
    const data = response.data.data.split("\n")
    setData(data);
    setIsLoading(false);

    // TODO: Add saving to the database (code is already in api/imagine-scenarios.ts)

    const proposalStart = Math.floor(Date.now() / 1000);
    const proposalEnd = Math.floor(Date.now() / 1000 + 10000);

    const createProposal = async (data, proposalStart, proposalEnd, currentEpoch, location) => {
        const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
        const client = new snapshot.Client712(hub);
        const web3 = new Web3Provider(window.ethereum);
        const account = getAccount().address
    
        const receipt = await client.proposal(web3, account, {
            space: 'stepa.eth',
            type: 'single-choice', // define the voting system
            title: 'Synthesia proposal | Epoch: ' + currentEpoch + ' for location ' + location,
            body: 'Vote for the next scenario',
            choices: data,
            start: proposalStart,
            end: proposalEnd,
            snapshot: 13620822,
            network: '1',
            plugins: JSON.stringify({}),
            app: 'synthesia' // provide the name of your project which is using this snapshot.js integration
        });
    };

    createProposal(data, proposalStart, proposalEnd, props.epoch, props.location);
  };

  return (
    <>
      <button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item}>
                {item}
                <br />
                Choose scenario
                <p></p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Scenarios;
