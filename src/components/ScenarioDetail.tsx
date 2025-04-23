import React, { useState } from 'react';
import { IScenario } from '../models/Scenario';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface ScenarioDetailProps {
  scenario: IScenario;
  onDelete?: () => void;
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ 
  scenario, 
  onDelete 
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  
  // Check if the user is the owner of this scenario
  const isOwner = session?.user?.id === scenario.userId;
  
  // Calculate total time for each stage
  const calculateTotalTime = (): number => {
    return scenario.stages.reduce((acc, stage) => acc + stage.totalTime, 0);
  };
  
  // Handle delete button click
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this scenario? This action cannot be undone.')) {
      setIsDeleting(true);
      
      try {
        const response = await fetch(`/api/scenarios/${scenario._id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete scenario');
        }
        
        // Call the onDelete callback if provided
        if (onDelete) {
          onDelete();
        }
        
        // Redirect to the scenarios list
        router.push('/scenarios');
      } catch (err: any) {
        setError(err.message || 'An error occurred while deleting the scenario');
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{scenario.title}</h1>
        
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/scenarios/edit/${scenario._id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-4 py-2 rounded-md ${
                isDeleting
                  ? 'bg-red-400 text-white'
                  : 'bg-red-600 text-white hover:bg-red-700'
              } transition-colors`}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
      
      <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-100 p-3 rounded-md">
          <span className="font-semibold">Total Time:</span> {scenario.totalTime} minutes
        </div>
        <div className="bg-gray-100 p-3 rounded-md">
          <span className="font-semibold">Group Size:</span> {scenario.groupCount} participants
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Debate Stages</h2>
        
        {scenario.stages.map((stage, index) => (
          <div key={stage.id} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium flex justify-between">
                <span>Stage {index + 1}: {stage.title}</span>
                <span className="text-gray-600">{stage.totalTime} minutes</span>
              </h3>
            </div>
            
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Activities:</h4>
              
              <div className="space-y-3">
                {stage.activities.map((activity) => (
                  <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span>{activity.title}</span>
                    <span className="text-sm text-gray-600">{activity.timeMinutes} minutes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push('/scenarios')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors mr-4"
        >
          Back to All Scenarios
        </button>
        
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Print Scenario
        </button>
      </div>
    </div>
  );
};

export default ScenarioDetail; 