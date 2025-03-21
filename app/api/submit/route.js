import dbConnect from "../../../lib/dbConnect";
import Assessment from "../../../models/Assessment";

export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await request.json();

    // Validate request body
    if (
      !body ||
      !body.profile ||
      !body.answers ||
      body.totalScore === undefined
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid request body",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create new assessment
    const assessment = new Assessment({
      profile: body.profile,
      answers: body.answers,
      totalScore: body.totalScore,
    });

    // Save to database
    const savedAssessment = await assessment.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Assessment saved successfully",
        data: {
          id: savedAssessment._id,
          totalScore: savedAssessment.totalScore,
          createdAt: savedAssessment.createdAt,
        },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving assessment:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
