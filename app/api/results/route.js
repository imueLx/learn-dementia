import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Assessment from "@/models/Assessment";

const TIMEOUT = 5000; // 5 seconds timeout

export async function GET() {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Connection timeout")), TIMEOUT)
  );

  try {
    // Connect to MongoDB with timeout
    await Promise.race([dbConnect(), timeoutPromise]);

    // Optimized query with projection
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("profile answers totalScore createdAt")
      .lean()
      .maxTimeMS(TIMEOUT);

    // Transform data efficiently
    const transformedData = assessments.map(
      ({ _id, profile, answers, totalScore, createdAt }) => ({
        _id: _id.toString(),
        profile,
        answers,
        totalScore,
        createdAt: createdAt.toISOString(),
      })
    );

    return NextResponse.json({
      success: true,
      data: transformedData,
    });
  } catch (error) {
    console.error("API Error:", error.message);

    // Specific error handling
    const status = error.message.includes("timeout") ? 504 : 500;
    return NextResponse.json(
      {
        success: false,
        error:
          status === 504
            ? "Database connection timed out"
            : "Internal server error",
      },
      { status }
    );
  }
}
