
import React from 'react';
import { UserCircle } from 'lucide-react';
import { BasicDetails } from '@/types/checkout';

interface UserInfoDisplayProps {
  details: BasicDetails;
}

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ details }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <UserCircle className="h-6 w-6 mr-2 text-gray-500" />
        Your Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
        <p><strong>First Name:</strong> {details.firstName}</p>
        <p><strong>Last Name:</strong> {details.lastName}</p>
        <p><strong>Date of Birth:</strong> {new Date(details.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Email:</strong> {details.email}</p>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
