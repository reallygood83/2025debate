import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import dbConnect from '../../lib/mongoose';
import { getScenarioById } from '../../services/scenarioService';
import { IScenario } from '../../models/Scenario';
import ScenarioDetail from '../../components/ScenarioDetail';

interface ScenarioPageProps {
  scenario: IScenario;
}

const ScenarioPage: React.FC<ScenarioPageProps> = ({ scenario }) => {
  const router = useRouter();
  const { data: session } = useSession();
  
  // If the page is still loading or the scenario doesn't exist
  if (router.isFallback || !scenario) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ScenarioDetail 
        scenario={scenario} 
        onDelete={() => router.push('/scenarios')}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();
  
  const id = context.params?.id as string;
  
  try {
    const scenario = await getScenarioById(id);
    
    if (!scenario) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        scenario: JSON.parse(JSON.stringify(scenario)),
      },
    };
  } catch (error) {
    console.error('Error fetching scenario:', error);
    return {
      notFound: true,
    };
  }
};

export default ScenarioPage; 