// the code to get scenarios for the current epoch

import { useState } from "react";
import axios from "axios";
import snapshot from '@snapshot-labs/snapshot.js';
import Button from "@/components/Button";

const GetScenarios = () => {  
  const [data, setData] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentUnixTime = Math.floor(Date.now() / 1000); // convert current time to Unix timestamp

  const handleButtonClick = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/fetch_scenarios");
    const data = response.data[8].voteCountsByChoice
    const endDate = response.data[8].end
    setData(data);
    setEndDate(endDate);
    setIsLoading(false);
  };

  const castVote = async (proposalId, choiceIndex) => {
    const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
    const client = new snapshot.Client712(hub);
    const web3 = new Web3Provider(window.ethereum);
    const account = getAccount().address

    const receipt = await client.vote(web3, account, {
        space: 'stepa.eth',
        proposal: proposalId,
        type: 'single-choice',
        choice: choiceIndex,
        reason: '',
        app: 'synthesia'
      });
  };

  return (
    <>
      <Button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Show scenarios"}
      </Button>
      {data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.choice}>
                {item.choice}
                <br />
                Current votes: {item.count.count}<br />
                <Button onClick={() => castVote(item.proposalId, item.count.index)}>
                    Vote
                </Button>
                <p></p>
            </li>
          ))}
        </ul>
      )}
      <p>{currentUnixTime > endDate ? "Vote finished" : "Vote in progress"}</p>
    </>
  );
};

export default GetScenarios;