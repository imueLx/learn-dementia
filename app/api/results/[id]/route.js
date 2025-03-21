import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Assessment from "@/models/Assessment";

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Invalid request parameters" },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const deletedAssessment = await Assessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return NextResponse.json(
        { success: false, error: "Assessment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedAssessment },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
