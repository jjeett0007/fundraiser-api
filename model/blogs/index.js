const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    file: String,
    type: String
  },
  { _id: false }
);

const contentJsonSchema = new mongoose.Schema(
  {
    root: {
      children: [
        {
          children: [
            {
              detail: Number,
              format: Number,
              mode: String,
              style: String,
              text: String,
              type: String,
              version: Number
            }
          ],
          direction: String,
          format: String,
          indent: Number,
          type: String,
          version: Number
        }
      ],
      direction: String,
      format: String,
      indent: Number,
      type: String,
      version: Number
    }
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    content: {
      type: String
    },
    excerpt: {
      type: String,
      trim: true
    },
    featuredImage: {
      type: fileSchema
    },
    category: {
      type: String,
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    metaDescription: {
      type: String,
      trim: true
    },
    keywords: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft"
    },
    publishNow: {
      type: Boolean,
      default: false
    },
    contentJson: contentJsonSchema,
    contentHtml: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Blog", blogSchema);
