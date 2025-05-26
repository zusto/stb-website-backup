import fs from 'fs';
import path from 'path';

export interface School {
  code: string;
  name: string;
}

// Read schools from JSON file
const schoolNamesJson = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../../../public/lovable-uploads/school_names.json'),
    'utf8'
  )
);

export const schools: School[] = schoolNamesJson.map((name: string, index: number) => ({
  code: String(index + 1).padStart(6, '0'),
  name: name
}));

// Debug log to verify data loading
console.log('📚 Schools List Loaded:', {
  totalSchools: schools.length,
  firstSchool: schools[0],
  lastSchool: schools[schools.length - 1]
});

// Add type safety check
const checkUniqueValues = (schools: School[]): void => {
  const values = new Set();
  schools.forEach(school => {
    if (values.has(school.code)) {
      console.warn(`Duplicate school code found: ${school.code} for ${school.name}`);
    }
    values.add(school.code);
  });
};

// Run check in development
if (process.env.NODE_ENV === 'development') {
  checkUniqueValues(schools);
}

