import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";
import Category from "../../../../model/category";

export const GET = async () => {
  await connectDb();
  let data = await Category.find();
  return NextResponse.json({ data });
};
