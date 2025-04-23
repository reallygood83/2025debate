import { generateWithGemini } from '../lib/gemini';
import { 
  SYSTEM_PROMPT, 
  generateScenarioPrompt, 
  parseScenarioResponse 
} from '../lib/prompts/scenario-prompts';
import Scenario, { IScenario } from '../models/Scenario';
import dbConnect from '../lib/mongoose';
import { v4 as uuidv4 } from 'uuid';

interface ScenarioRequest {
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeAvailable: number; // in minutes
  groupSize: number;
  userId?: string;
}

/**
 * Generate a debate scenario using Gemini API
 */
export async function generateDebateScenario(
  request: ScenarioRequest
): Promise<IScenario> {
  try {
    // Connect to database
    await dbConnect();
    
    // Generate prompt for Gemini
    const prompt = generateScenarioPrompt(
      request.topic,
      request.difficulty,
      request.timeAvailable,
      request.groupSize
    );
    
    // Get response from Gemini
    const geminiResponse = await generateWithGemini(prompt, SYSTEM_PROMPT);
    
    // Parse the response
    const scenarioData = parseScenarioResponse(geminiResponse);
    
    // Add UUID to each activity and stage if not present
    scenarioData.stages = scenarioData.stages.map(stage => ({
      ...stage,
      id: stage.id || uuidv4(),
      activities: stage.activities.map(activity => ({
        ...activity,
        id: activity.id || uuidv4()
      }))
    }));
    
    // Add userId if provided
    if (request.userId) {
      scenarioData.userId = request.userId;
    }
    
    // Create a new scenario
    const newScenario = new Scenario(scenarioData);
    await newScenario.save();
    
    return newScenario;
  } catch (error) {
    console.error('Error generating debate scenario:', error);
    throw error;
  }
}

/**
 * Get all scenarios, optionally filtered by userId
 */
export async function getScenarios(userId?: string): Promise<IScenario[]> {
  await dbConnect();
  const query = userId ? { userId } : {};
  return Scenario.find(query).sort({ createdAt: -1 });
}

/**
 * Get a scenario by ID
 */
export async function getScenarioById(id: string): Promise<IScenario | null> {
  await dbConnect();
  return Scenario.findById(id);
}

/**
 * Delete a scenario
 */
export async function deleteScenario(id: string): Promise<boolean> {
  await dbConnect();
  const result = await Scenario.findByIdAndDelete(id);
  return !!result;
}

/**
 * Update a scenario
 */
export async function updateScenario(
  id: string, 
  updates: Partial<IScenario>
): Promise<IScenario | null> {
  await dbConnect();
  return Scenario.findByIdAndUpdate(id, updates, { new: true });
} 