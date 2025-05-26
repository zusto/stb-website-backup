import { useState, useEffect } from 'react';
import { sampleSchoolsList, School } from '@/data/schoolsList'; // Import the local data

interface ClearinghouseApiSchool {
  opeid: string;
  institutionName: string;
  active: boolean;
}

export type { School }; // Changed to export type

export const useSchoolsList = () => {
  const [schoolsList, setSchoolsList] = useState<School[]>([]);
  const [isLoadingSchools, setIsLoadingSchools] = useState<boolean>(true);
  const [schoolsError, setSchoolsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      setIsLoadingSchools(true);
      setSchoolsError(null);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use the imported sample data
        const formattedSchools: School[] = sampleSchoolsList
          .filter(school => school.label && school.value) // Basic validation
          .sort((a, b) => a.label.localeCompare(b.label));
        
        if (formattedSchools.length === 0) {
          setSchoolsError("No schools found in the sample list. Please check the data source.");
        }
        setSchoolsList(formattedSchools);
      } catch (error) {
        console.error("Error processing sample schools list:", error);
        if (error instanceof Error) {
          setSchoolsError(error.message);
        } else {
          setSchoolsError("Could not load the list of schools from the sample data.");
        }
      } finally {
        setIsLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  return { schoolsList, isLoadingSchools, schoolsError };
};
