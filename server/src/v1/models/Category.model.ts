import mongoose from "mongoose";
interface ICategory {
  name: string;
  parent?: mongoose.ObjectId;
}

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category is Required"],
      trim: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
export default CategoryModel;
