import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getUserProfileApi, useGetUserProfile } from './useGetUserProfile';

type User = {
  address: string;
  labels: string[];
};

type Compatibility = {
  address: string;
  commonLabels: number;
};

  const findMostCompatibleUsers = (currentUser: User, allUsers: User[]): Compatibility[] => {
    const compatibilities: Compatibility[] = [];

    for (const user of allUsers) {
      // Skip the same user
      if (currentUser.address === user.address) continue;

      // Calculate the common labels
      const commonLabels = currentUser.labels.filter(label => user.labels.includes(label)).length;

      compatibilities.push({ address: user.address, commonLabels });
    }

    // Sort by the number of common labels in ascending order
    return compatibilities.sort((a, b) => a.commonLabels - b.commonLabels);
  };

  
  export const useFindMostCompatibleUser = () => {
    const { data: fetchedUser, isLoading } = useGetUserProfile();
    const [mostCompatible, setMostCompatible] = useState<Compatibility[] | null>(null);  // Changed type here
    
    const users: User[] = [/* Fetch this from your API or state */];

    useEffect(() => {
      if (!isLoading && fetchedUser) {
        const currentUser: User = {
          address: fetchedUser.address,
          labels: fetchedUser.profile.labels
        };
  
        setMostCompatible(findMostCompatibleUsers(currentUser, users));
      }
    }, [fetchedUser, isLoading, users]);
  
    return { mostCompatible, isLoading };
};