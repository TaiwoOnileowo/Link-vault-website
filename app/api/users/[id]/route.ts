import { NextRequest } from "next/server";

export function GET(req: NextRequest, { params }: { params: { id: number } }) {
  //Fetch links from the mongodb, fetch by user id
  //if not found, return 404 error
  // Else return the links
}


export function PUT(req: NextRequest, { params }: { params: { id: number } }) {
  //Validate the request body
  //If invalid, return 404
  //Fetch the user with the given id
  // If it doesnt exist, retun 404
  //Update the user with the new data
  // Return the updated user
}

export function DELETE(req: NextRequest, { params }: { params: { id: number }}){
    // Fetch the user with the given id
    // If it doesnt exist, return 404
    // Delete the user or the user data
    // Return 200
}