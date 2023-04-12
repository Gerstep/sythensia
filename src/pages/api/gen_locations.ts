import { db } from '../../utils/db'
import { genLocationAgent } from "../../utils/chain";

interface ParsedObject {
  name: string;
  descr: string;
}

// get location object data
function parseString(str: string): ParsedObject {
  // find the location and description strings
  const locationStart = str.indexOf("Location:") + "Location:".length;
  const locationEnd = str.indexOf("Description:");
  const descrStart = locationEnd + "Description:".length;

  // extract the location and description from the string
  const location = str.substring(locationStart, locationEnd).trim();
  const descr = str.substring(descrStart).trim();

  // create and return the object
  const obj: ParsedObject = { name: location, descr: descr };
  return obj;
}

export const createLocation = async ({ name, descr }) => {
  try {
    const { data, error } = await db.from('locations').insert({ name, descr });
    if (error) console.log('Error creating location', error);
    else return data;
  } catch(error) {
    throw new Error(error.message);
  }
};


export default async function handler(req, res) {
  try {
    const location = await genLocationAgent();

    if (location) {
      const locationData = parseString(location.generations[0][0].text)
      await createLocation(locationData)
      return res.status(200).json(locationData);
    } else {
      throw new Error('Error generating location');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};