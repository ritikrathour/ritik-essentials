import mongoose from "mongoose";
import { ICategory } from "../../types";

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category is Required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: String,
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);
// create slug
const CreateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "") // remove quites
    .replace(/\s+/g, "-") //replace space to -
    .replace(/[^a-z0-9]/g, "") //replace space num to -
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
};
CategorySchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = CreateSlug(this.name);
  }
  next();
});

export default CategoryModel;
