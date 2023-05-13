import { NextResponse } from "next/server";

const API_URL = "https://swapi.dev/api";
const FILMS_URL = API_URL + "/films";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  const res = await fetch(`${FILMS_URL}?search=${search}`);
  const data = await res.json();
  return NextResponse.json(data);
}
