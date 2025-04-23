import mongoose, { Schema, Document } from 'mongoose';

interface ActivityStep {
  id: string;
  title: string;
  timeMinutes: number;
}

interface DebateStage {
  id: string;
  title: string;
  activities: ActivityStep[];
  totalTime: number;
}

export interface IScenario extends Document {
  title: string;
  totalTime: number;
  groupCount: number;
  stages: DebateStage[];
  createdAt: Date;
  userId?: string; // Optional user ID if authentication is implemented
}

const ActivityStepSchema = new Schema<ActivityStep>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  timeMinutes: { type: Number, required: true }
});

const DebateStageSchema = new Schema<DebateStage>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  activities: [ActivityStepSchema],
  totalTime: { type: Number, required: true }
});

const ScenarioSchema = new Schema<IScenario>({
  title: { type: String, required: true },
  totalTime: { type: Number, required: true },
  groupCount: { type: Number, required: true },
  stages: [DebateStageSchema],
  createdAt: { type: Date, default: Date.now },
  userId: { type: String }
});

export default mongoose.models.Scenario || mongoose.model<IScenario>('Scenario', ScenarioSchema); 