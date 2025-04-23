import mongoose, { Document, Schema } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  proPoints: string[];
  conPoints: string[];
  sources: {
    title: string;
    url: string;
  }[];
  popularity: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema = new Schema<ITopic>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Difficulty is required'],
    },
    proPoints: {
      type: [String],
      default: [],
    },
    conPoints: {
      type: [String],
      default: [],
    },
    sources: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    popularity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for text search
TopicSchema.index(
  { title: 'text', description: 'text', tags: 'text' },
  { weights: { title: 3, description: 2, tags: 1 } }
);

export default mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema); 