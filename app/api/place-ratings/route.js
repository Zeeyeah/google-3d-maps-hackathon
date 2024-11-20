import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = 'edge'; // Use Edge runtime for nextUrl

export const GET = async (request) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const placeId = request.nextUrl.searchParams.get("placeId");

        if (!placeId) {
            return NextResponse.json({ error: "placeId is required" }, { status: 400 });
        }

        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/details/json",
            {
                params: {
                    place_id: placeId,
                    key: apiKey,
                },
            }
        );

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Error fetching place details:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch place details" },
            { status: 500 }
        );
    }
};
