import type { NextApiRequest, NextApiResponse } from 'next';
import { generateDebateScenario } from '../../../services/scenarioService';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the user session (if authenticated)
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;

    // Get the request body
    const { topic, difficulty, timeAvailable, groupSize } = req.body;

    // Validate required fields
    if (!topic || !difficulty || !timeAvailable || !groupSize) {
      return res.status(400).json({ 
        message: 'Missing required fields: topic, difficulty, timeAvailable, and groupSize are required' 
      });
    }

    // Validate difficulty
    if (!['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
      return res.status(400).json({
        message: 'Invalid difficulty. Must be one of: beginner, intermediate, advanced'
      });
    }

    // Validate timeAvailable and groupSize
    if (timeAvailable < 10 || timeAvailable > 180) {
      return res.status(400).json({
        message: 'timeAvailable must be between 10 and 180 minutes'
      });
    }

    if (groupSize < 2 || groupSize > 20) {
      return res.status(400).json({
        message: 'groupSize must be between 2 and 20'
      });
    }

    // Generate the scenario
    const scenario = await generateDebateScenario({
      topic,
      difficulty,
      timeAvailable,
      groupSize,
      userId
    });

    // Return the generated scenario
    return res.status(200).json(scenario);
  } catch (error: any) {
    console.error('Error generating scenario:', error);
    return res.status(500).json({ 
      message: 'Failed to generate scenario',
      error: error.message 
    });
  }
} 