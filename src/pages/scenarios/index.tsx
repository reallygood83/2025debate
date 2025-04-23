import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dbConnect from '../../lib/mongoose';
import { getScenarios } from '../../services/scenarioService';
import { IScenario } from '../../models/Scenario';
import ScenarioGenerator from '../../components/ScenarioGenerator';

interface ScenariosPageProps {
  initialScenarios: IScenario[];
}

const ScenariosPage: React.FC<ScenariosPageProps> = ({ initialScenarios }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [scenarios, setScenarios] = useState<IScenario[]>(initialScenarios);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  // Function to refresh scenarios
  const refreshScenarios = async () => {
    try {
      const response = await fetch('/api/scenarios');
      if (response.ok) {
        const data = await response.json();
        setScenarios(data);
      }
    } catch (error) {
      console.error('Error fetching scenarios:', error);
    }
  };
  
  // Handle scenario generation completion
  const handleScenarioGenerated = (newScenario: IScenario) => {
    setScenarios((prevScenarios) => [newScenario, ...prevScenarios]);
    setIsCreatingNew(false);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Debate Scenarios</h1>
        <p className="text-gray-600">
          Browse existing debate scenarios or create your own custom scenario.
        </p>
      </div>
      
      {isCreatingNew ? (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New Scenario</h2>
            <button
              onClick={() => setIsCreatingNew(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
          <ScenarioGenerator onScenarioGenerated={handleScenarioGenerated} />
        </div>
      ) : (
        <div className="mb-8">
          <button
            onClick={() => setIsCreatingNew(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Scenario
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.length > 0 ? (
          scenarios.map((scenario) => (
            <div
              key={scenario._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 truncate">
                  {scenario.title}
                </h3>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{scenario.totalTime} minutes</span>
                  <span>{scenario.groupCount} participants</span>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Stages:</h4>
                  <ul className="text-sm ml-4">
                    {scenario.stages.map((stage) => (
                      <li key={stage.id} className="list-disc mb-1">
                        {stage.title} ({stage.totalTime} min)
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/scenarios/${scenario._id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No scenarios found.</p>
            <button
              onClick={() => setIsCreatingNew(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  
  try {
    const scenarios = await getScenarios();
    
    return {
      props: {
        initialScenarios: JSON.parse(JSON.stringify(scenarios)),
      },
    };
  } catch (error) {
    console.error('Error fetching scenarios:', error);
    return {
      props: {
        initialScenarios: [],
      },
    };
  }
};

export default ScenariosPage; 