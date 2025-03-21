import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Assessment from "@/models/Assessment";

export async function GET() {
  await dbConnect();

  try {
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(10);

    // Transform the data if needed to match your expected format
    const formattedData = assessments.map((assessment) => {
      return {
        _id: assessment._id,
        profile: assessment.profile,
        answers: assessment.answers,
        totalScore: assessment.totalScore,
        createdAt: assessment.createdAt,
      };
    });

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
