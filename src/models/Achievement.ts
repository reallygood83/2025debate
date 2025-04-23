import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  name: string;
  description: string;
  icon: string;
  category: 'debate' | 'learning' | 'practice' | 'social';
  requirements: {
    debatesCompleted?: number;
    topicsExplored?: number;
    minimumScore?: number;
    consecutiveDays?: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  pointsAwarded: number;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, 'Icon is required'],
    },
    category: {
      type: String,
      enum: ['debate', 'learning', 'practice', 'social'],
      required: [true, 'Category is required'],
    },
    requirements: {
      debatesCompleted: {
        type: Number,
        default: 0,
      },
      topicsExplored: {
        type: Number,
        default: 0,
      },
      minimumScore: {
        type: Number,
        default: 0,
      },
      consecutiveDays: {
        type: Number,
        default: 0,
      },
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: [true, 'Difficulty is required'],
    },
    pointsAwarded: {
      type: Number,
      required: [true, 'Points awarded is required'],
      default: 10,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);
