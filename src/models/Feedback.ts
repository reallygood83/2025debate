import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  debate: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  overallRating: number;
  strengths: string[];
  weaknesses: string[];
  suggestedImprovements: string[];
  detailedAnalysis: string;
  roundFeedback: {
    roundNumber: number;
    score: number;
    comments: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    debate: {
      type: Schema.Types.ObjectId,
      ref: 'Debate',
      required: [true, 'Debate is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    overallRating: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: 0,
      max: 100,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    suggestedImprovements: {
      type: [String],
      default: [],
    },
    detailedAnalysis: {
      type: String,
      default: '',
    },
    roundFeedback: [
      {
        roundNumber: {
          type: Number,
          required: true,
        },
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        comments: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure one feedback per debate
FeedbackSchema.index({ debate: 1 }, { unique: true });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema); 