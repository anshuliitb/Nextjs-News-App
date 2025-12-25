import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary"; 
import News from "@/models/newsModel";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();

  const title = formData.get("title");
  const date = formData.get("date");
  const content = formData.get("content");
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  // Upload image to Cloudinary
  const uploadedImage = await uploadImage(image);  

  // Save document using your schema fields
  const news = await News.create({
    title,
    imageUrl: uploadedImage.url,
    imagePublicId: uploadedImage.publicId,
    date,
    content,
  });

  revalidatePath("/","layout");

  return NextResponse.json({ message: "News created", news });
}
