/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/app/libs/auth";
import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from "@/app/libs/apis";

export async function GET(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Obrigatório esta Logado", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Nao foi possivel fazer o Fetch", { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Obrigatório esta Logado", { status: 500 });
  }

  const { roomId, reviewText, ratingValue } = await req.json();

  if (!roomId || !reviewText || !ratingValue) {
    return new NextResponse("Todos os campos são obrigatórios", {
      status: 400,
    });
  }

  const userId = session.user.id;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const alreadyExists = await checkReviewExists(userId, roomId);

    console.log(alreadyExists);

    let data;

    if (alreadyExists) {
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error: any) {
    console.log("Error Updating", error);
    return new NextResponse("Não foi possível cria o Review", { status: 400 });
  }
}
