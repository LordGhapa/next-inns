import { getRoomReviews } from "@/app/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const roomId = params.id;

  try {
    const roomReviews = await getRoomReviews(roomId);

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: "Sucesso!",
    });
  } catch (error) {
    console.log("Falha ao fazer get de Review", error);
    return new NextResponse("Não foi possível fazer o fetch", { status: 400 });
  }
}
