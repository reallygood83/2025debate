import mongoose, { Document, Schema } from 'mongoose';

export interface IUserAchievement extends Document {
  user: mongoose.Types.ObjectId;
  achievement: mongoose.Types.ObjectId;
  dateEarned: Date;
  progress: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserAchievementSchema = new Schema<IUserAchievement>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    achievement: {
      type: Schema.Types.ObjectId,
      ref: 'Achievement',
      required: [true, 'Achievement is required'],
    },
    dateEarned: {
      type: Date,
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure a user can't earn the same achievement twice
UserAchievementSchema.index({ user: 1, achievement: 1 }, { unique: true });

export default mongoose.models.UserAchievement || mongoose.model<IUserAchievement>('UserAchievement', UserAchievementSchema); 