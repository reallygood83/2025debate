/**
 * Prompts for generating debate scenarios using Gemini API
 */

export const SYSTEM_PROMPT = `
You are an expert debate coach and educator specialized in creating structured debate scenarios for educational purposes.
Your task is to create meaningful, engaging, and well-structured debate scenarios that can be used in a classroom or debate club setting.
You should provide detailed, structured scenarios with clear stages, activities, and time allocations.
`;

export function generateScenarioPrompt(
  topic: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  timeAvailable: number, // in minutes
  groupSize: number
): string {
  return `
Create a comprehensive debate scenario on the topic: "${topic}"

The scenario should be designed for ${difficulty} level students in groups of ${groupSize} participants.
The total time available for the debate is ${timeAvailable} minutes.

Please structure the response as a JSON object with the following format:
{
  "title": "Descriptive title for the debate scenario",
  "totalTime": ${timeAvailable},
  "groupCount": ${groupSize},
  "stages": [
    {
      "id": "unique-id-for-stage-1",
      "title": "Stage name (e.g., 'Preparation', 'Opening Arguments')",
      "activities": [
        {
          "id": "unique-id-for-activity-1",
          "title": "Clear description of the activity",
          "timeMinutes": number of minutes for this activity
        },
        // More activities...
      ],
      "totalTime": sum of all activity times for this stage
    },
    // More stages...
  ]
}

Design the scenario to be educationally valuable, well-paced, and engaging. Include activities that develop critical thinking, research skills, and effective communication.

For ${difficulty} level, focus on ${
    difficulty === 'beginner'
      ? 'basic argumentation skills, simpler topics, and more structured guidance'
      : difficulty === 'intermediate'
      ? 'developing more nuanced arguments, introducing rebuttal techniques, and building evidence-based positions'
      : 'advanced rhetorical techniques, complex moral reasoning, and sophisticated policy analysis'
  }.

Ensure stage and activity IDs are unique. Calculate the totalTime for each stage as the sum of all activity times within that stage.
The sum of all stage totalTime values should not exceed ${timeAvailable} minutes.
`;
}

export function parseScenarioResponse(response: string): any {
  try {
    // Extract JSON from the response, handling potential text before/after the JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in the response');
    }
    
    const jsonString = jsonMatch[0];
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing scenario response:', error);
    throw new Error('Failed to parse the AI-generated scenario.');
  }
} 