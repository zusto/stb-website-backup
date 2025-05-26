import schoolNamesJson from '../../public/lovable-uploads/school_names.json' assert { type: 'json' };

export interface School {
  value: string;  // This is your college ID (e.g., "000001")
  label: string;  // This is your college name (e.g., "A.T. STILL UNIVERSITY")
}

export const sampleSchoolsList: School[] = schoolNamesJson.map((name: string, index: number) => ({
  value: String(index + 1).padStart(6, '0'),
  label: name
}));

// Add type safety check
const checkUniqueValues = (schools: School[]): void => {
  const values = new Set();
  schools.forEach(school => {
    if (values.has(school.value)) {
      console.warn(`Duplicate school value found: ${school.value} for ${school.label}`);
    }
    values.add(school.value);
  });
};

// Run check in development
if (process.env.NODE_ENV === 'development') {
  checkUniqueValues(sampleSchoolsList);
}

