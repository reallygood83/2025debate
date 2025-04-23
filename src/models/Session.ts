import mongoose, { Document, Schema } from 'mongoose';

export interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  activities: {
    type: 'debate' | 'learning' | 'practice' | 'assessment';
    entityId: mongoose.Types.ObjectId;
    entityType: string;
    duration: number;
    completed: boolean;
  }[];
  totalScore: number;
  progress: number; // percentage 0-100
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: null,
    },
    duration: {
      type: Number,
      default: 0,
    },
    activities: [
      {
        type: {
          type: String,
          enum: ['debate', 'learning', 'practice', 'assessment'],
          required: true,
        },
        entityId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        entityType: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    totalScore: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate session duration when ending a session
SessionSchema.methods.endSession = function(): Promise<ISession> {
  this.endTime = new Date();
  this.duration = Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 1000);
  return this.save();
};

export default mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema); 