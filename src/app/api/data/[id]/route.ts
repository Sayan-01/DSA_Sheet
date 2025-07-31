import { NextResponse } from "next/server";
import Category from "../../../../../model/category";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { problemId, currStatus } = body;

    const updatedProblem = await Category.updateOne(
      { "problems.id": problemId }, // Find the category that has this problem
      { $set: { "problems.$.isComplete": currStatus } } // Update the matching problem's `todo` field
    );

    return NextResponse.json(updatedProblem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update problem" }, { status: 500 });
  }
};
