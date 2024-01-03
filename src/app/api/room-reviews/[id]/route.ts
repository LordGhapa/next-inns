import { getRoomReviews } from "@/app/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const roomReviews = await getRoomReviews();

    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: "Sucesso!",
    });
  } catch (error) {
    console.log("Falha ao fazer get de Review", error);
    return new NextResponse("Não foi possível fazer o fetch", { status: 400 });
  }
}
