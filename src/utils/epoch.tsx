// import { useState, useEffect } from 'react';

// const EpochManager = ({ setCurrentEpoch }) => {
//   const [currentEpoch, setCurrentEpochLocal] = useState(null);

//   useEffect(() => {
//     const fetchCurrentEpoch = async () => {
//       try {
//         const response = await fetch('/api/fetch_epoch');
//         const data = await response.json();
//         setCurrentEpoch(data.currentEpoch);
//         setCurrentEpochLocal(data.currentEpoch);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCurrentEpoch();
//   }, [setCurrentEpoch]);

//   const saveEpochToMongoDB = async (epoch) => {
//     try {
//       const response = await fetch('/api/save_epoch', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ epoch }),
//       });
//       const data = await response.json();
//       console.log(data);
//       setCurrentEpoch(epoch); // call the setter function to update state in the ancestor component
//       setCurrentEpochLocal(epoch); // update local state
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (currentEpoch !== null) {
//       const epochTimer = setInterval(() => {
//           setCurrentEpochLocal(epoch => {
//               const newEpoch = epoch + 1;
//               saveEpochToMongoDB(newEpoch);
//               return newEpoch;
//           });
//       }, 10000000);

//       return () => clearInterval(epochTimer);
//     }
//   }, [currentEpoch]);
// };

// export default EpochManager;