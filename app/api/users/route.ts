import { NextRequest } from "next/server";

export async function POST (request: NextRequest){
    const body = await request.json();
    //Validate body, eg if(!body.name) return 400
    //If invalid, return 400
    //Else, return the data created
    //## USE STATUS OF 201 WHEN AN OBJECT IS CREATED/ RETURNED
}