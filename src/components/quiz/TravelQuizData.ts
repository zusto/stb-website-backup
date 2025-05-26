interface DestinationData {
  img: string;
  costFactor: number;
}

interface DestinationMap {
  [key: string]: DestinationData;
}

const DESTINATION_DATA: DestinationMap = {
  'Barcelona': {
    img: '/images/destinations/barcelona.jpg',
    costFactor: 1.2
  },
  'Paris': {
    img: '/images/destinations/paris.jpg',
    costFactor: 1.4
  },
  'Rome': {
    img: '/images/destinations/rome.jpg',
    costFactor: 1.1
  },
  'Amsterdam': {
    img: '/images/destinations/amsterdam.jpg',
    costFactor: 1.3
  },
  'London': {
    img: '/images/destinations/london.jpg',
    costFactor: 1.5
  }
  // Add more destinations as needed
};

export const getDestData = (destination: string): DestinationData => {
  const data = DESTINATION_DATA[destination];
  if (!data) {
    throw new Error(`No data found for destination: ${destination}`);
  }
  return data;
};