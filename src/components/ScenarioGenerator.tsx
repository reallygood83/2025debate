import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface ScenarioGeneratorProps {
  onScenarioGenerated?: (scenario: any) => void;
}

const ScenarioGenerator: React.FC<ScenarioGeneratorProps> = ({ 
  onScenarioGenerated 
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  
  // Form state
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [timeAvailable, setTimeAvailable] = useState(60);
  const [groupSize, setGroupSize] = useState(4);
  
  // Loading and error states
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/scenarios/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          difficulty,
          timeAvailable,
          groupSize,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate scenario');
      }
      
      const scenario = await response.json();
      
      // Call the callback if provided
      if (onScenarioGenerated) {
        onScenarioGenerated(scenario);
      }
      
      // Redirect to the scenario page
      router.push(`/scenarios/${scenario._id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the scenario');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Generate Debate Scenario</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            Debate Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Should artificial intelligence be regulated?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="timeAvailable" className="block text-sm font-medium text-gray-700 mb-1">
              Time Available (minutes)
            </label>
            <input
              id="timeAvailable"
              type="number"
              min="10"
              max="180"
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
              Group Size
            </label>
            <input
              id="groupSize"
              type="number"
              min="2"
              max="20"
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-2 px-4 rounded-md ${
            isGenerating
              ? 'bg-blue-400 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          {isGenerating ? 'Generating...' : 'Generate Scenario'}
        </button>
        
        {isGenerating && (
          <p className="mt-2 text-sm text-gray-600 text-center">
            This may take a moment. We're crafting a detailed debate scenario for you.
          </p>
        )}
      </form>
    </div>
  );
};

export default ScenarioGenerator; 