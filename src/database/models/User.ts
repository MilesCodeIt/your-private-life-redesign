import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  
  levels: Map<string, boolean>;
}

const schema: mongoose.SchemaDefinition = {
  username: { type: mongoose.SchemaTypes.String, required: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
  email: { type: mongoose.SchemaTypes.String, required: true },

  levels: { type: mongoose.SchemaTypes.Map, required: true }
};

const collectionName = "user";
const userSchema = new mongoose.Schema<IUser>(schema);

export default mongoose.models[collectionName] as mongoose.Model<IUser>
  || mongoose.model<IUser>(collectionName, userSchema);
