import type { NextApiRequest, NextApiResponse } from 'next';
import { getScenarios } from '../../../services/scenarioService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/authOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the user session (if authenticated)
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;

    // If user is authenticated, get their scenarios
    // Otherwise, get public scenarios
    const scenarios = await getScenarios(userId);

    return res.status(200).json(scenarios);
  } catch (error: any) {
    console.error('Error fetching scenarios:', error);
    return res.status(500).json({ 
      message: 'Failed to fetch scenarios',
      error: error.message 
    });
  }
} 