import React from 'react';
import { useQuery, gql, NetworkStatus } from '@apollo/client';

type LocationElements = {
    id: string,
    name: string,
    description: string,
    photo: string;
}

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

const DisplayLocations = () => {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_LOCATIONS, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 500, // fetch the data every 0.5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  return data.locations.map(({ id, name, description, photo } : LocationElements) => (
    <div key={id}>
      <h3>{name}</h3>
      <img onClick={() => refetch()} width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}

export default DisplayLocations;
