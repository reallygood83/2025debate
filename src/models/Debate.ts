import mongoose, { Document, Schema } from 'mongoose';

export interface IDebate extends Document {
  topic: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  stance: 'pro' | 'con';
  rounds: {
    userArgument: string;
    aiRebuttal: string;
    timestamp: Date;
  }[];
  status: 'in-progress' | 'completed' | 'abandoned';
  score: number;
  feedback: string;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const DebateSchema = new Schema<IDebate>(
  {
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: [true, 'Topic is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    stance: {
      type: String,
      enum: ['pro', 'con'],
      required: [true, 'Stance is required'],
    },
    rounds: [
      {
        userArgument: {
          type: String,
          required: [true, 'User argument is required'],
        },
        aiRebuttal: {
          type: String,
          required: [true, 'AI rebuttal is required'],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress',
    },
    score: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Debate || mongoose.model<IDebate>('Debate', DebateSchema); 