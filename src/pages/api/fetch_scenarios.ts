import { GraphQLClient } from 'graphql-request';

export default async function handler(req, res) {
  const graphQLClient = new GraphQLClient('https://hub.snapshot.org/graphql');
  
  const proposalsQuery = `query Proposals {
    proposals(
      first: 10,
      skip: 0,
      where: {
        space_in: ["stepa.eth"]
      },
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      author
    }
  }`;

  const votesQuery = `query Votes ($id: String!) {
    votes (
      first: 1000
      skip: 0
      where: {
        proposal: $id
      }
      orderBy: "created",
      orderDirection: desc
    ) {
      id
      voter
      vp
      vp_by_strategy
      vp_state
      created
      proposal {
        id
      }
      choice
    }
  }`;
  
  try {
  // Get all proposals
  const { proposals } = await graphQLClient.request(proposalsQuery);
    
  // Loop through each proposal and get the corresponding votes
  const proposalsWithVotes = await Promise.all(proposals.map(async (proposal) => {
    const { id, choices } = proposal;
    const { votes } = await graphQLClient.request(votesQuery, { id });
    const voteCountsByChoice = {};

    // Initialize the vote counts for each choice to 0
    choices.forEach((choice, i) => {
      voteCountsByChoice[choice] = { count: 0, index: i+1 };
      // console.log('saved choice: ' + choice + ' with index ' + voteCountsByChoice[choice].index)
    });

    // Calculate the vote count for each choice
    votes.forEach((vote) => {
      Object.keys(voteCountsByChoice).forEach((choice) => {
        if (vote.choice === voteCountsByChoice[choice].index) {
          voteCountsByChoice[choice].count++;
        }
      });
    });

    // Add the choice text and vote count to each voteCountsByChoice object
    const choiceTextAndCount = Object.entries(voteCountsByChoice).map(([choice, count]) => {
      return {
        choice,
        count,
        proposalId: id,
      };
    });    

    return { ...proposal, voteCountsByChoice: choiceTextAndCount };
  }));

    // Return the proposals with vote counts in the response
    res.status(200).json(proposalsWithVotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// import type { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../../db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection('scenarios');
//     const scenarios = await collection.findOne({}, { sort: { $natural: -1 } });
//     res.status(200).json({ data: scenarios ? scenarios.scenario : 0 });
//     console.log("fetched:" + scenarios.scenario)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to retrieve current epoch' });
//   }
// }

