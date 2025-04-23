import type { NextApiRequest, NextApiResponse } from 'next';
import { 
  getScenarioById, 
  updateScenario, 
  deleteScenario 
} from '../../../services/scenarioService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/authOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the scenario ID from the URL
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid scenario ID' });
  }

  // Get the user session (if authenticated)
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  try {
    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        // Get a single scenario by ID
        const scenario = await getScenarioById(id);
        
        if (!scenario) {
          return res.status(404).json({ message: 'Scenario not found' });
        }
        
        // If the scenario has a userId, check if it belongs to the current user
        if (scenario.userId && scenario.userId !== userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
        
        return res.status(200).json(scenario);
        
      case 'PUT':
        // Check if user is authenticated
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // Get the scenario to check ownership
        const scenarioToUpdate = await getScenarioById(id);
        
        if (!scenarioToUpdate) {
          return res.status(404).json({ message: 'Scenario not found' });
        }
        
        // Check if the scenario belongs to the user
        if (scenarioToUpdate.userId && scenarioToUpdate.userId !== userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
        
        // Update the scenario
        const updatedScenario = await updateScenario(id, req.body);
        return res.status(200).json(updatedScenario);
        
      case 'DELETE':
        // Check if user is authenticated
        if (!userId) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // Get the scenario to check ownership
        const scenarioToDelete = await getScenarioById(id);
        
        if (!scenarioToDelete) {
          return res.status(404).json({ message: 'Scenario not found' });
        }
        
        // Check if the scenario belongs to the user
        if (scenarioToDelete.userId && scenarioToDelete.userId !== userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
        
        // Delete the scenario
        const deleted = await deleteScenario(id);
        
        if (deleted) {
          return res.status(200).json({ message: 'Scenario deleted successfully' });
        } else {
          return res.status(500).json({ message: 'Failed to delete scenario' });
        }
        
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error(`Error handling scenario ${req.method} request:`, error);
    return res.status(500).json({ 
      message: `Failed to process scenario ${req.method} request`,
      error: error.message 
    });
  }
} 