import { db } from '../../db'

export const fetchLocations = async () => {
  try {
    const { data, error } = await db.from('locations').select('*');
    if (error) console.log('Error fetching locations', error);
    else return data;
  } catch(error) {
    throw new Error(error.message);
  }
};


export default async function handler(req, res) {
  try {
    const data = await fetchLocations();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}