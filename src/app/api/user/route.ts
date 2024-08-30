import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

import crypto from "crypto";
import { UserProps } from "@/types";

const usersFilePath = path.join(process.cwd(), "public/mocks/user.json");

export async function GET() {
  try {
    const user = await fsPromises.readFile(usersFilePath, "utf-8");
    const json = JSON.parse(user);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "No user found!" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Step 1: read json file
    const users = await fsPromises.readFile(usersFilePath, "utf-8");

    // Step 2: parse it into a JSON array
    const jsonArray = JSON.parse(users);

    // Step 3: destructure values from request body
    const { name, email, phone, gender, id } = await req.json();

    // Step 4: find the user index of the user to be patched
    const userIndex = jsonArray.findIndex((user: UserProps) => user.id === id);

    // Step 4.1: if user can't be found, return 404
    if (userIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "User not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    // Step 5: get desired user
    let desiredUser = jsonArray[userIndex];

    // Step 6: patch User just with the values of the body that are not undefined
    desiredUser.name = name ? name : desiredUser.name;
    desiredUser.email = email ? email : desiredUser.email;
    desiredUser.phone = phone ? phone : desiredUser.phone;
    desiredUser.gender = gender ? gender : desiredUser.gender;

    // Step 7: update the JSON array
    jsonArray[userIndex] = desiredUser;

    // Step 8: convert the JSON array back to a JSON string
    const updatedData = JSON.stringify(jsonArray);

    // Step 9: write the updated data to the JSON file
    await fsPromises.writeFile(usersFilePath, updatedData);

    // Step 10: return response to frontend (200 ok)
    return new NextResponse(
      JSON.stringify({ message: "User patched successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Step 1: read json file
    const users = await fsPromises.readFile(usersFilePath, "utf-8");

    // Step 2: parse it into a JSON array
    const jsonArray = JSON.parse(users);

    // Step 3: destructure values from request body
    const { name, email, phone, gender } = await req.json();

    // Step 4: generate the ID for the new user
    const id = crypto.randomBytes(16).toString("hex");

    // Step 5: add the new user to the json array
    jsonArray.push({ id, name, email, phone, gender });

    // Step 6: convert JSON array back to string
    const updatedData = JSON.stringify(jsonArray);

    // Step 7: write the updated data to the JSON file
    await fsPromises.writeFile(usersFilePath, updatedData);

    // Step 8: return response of a successful post (201)
    return new NextResponse(
      JSON.stringify({ message: "User created successfully!" }),
      { status: 201, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Step 1: extract user ID
    const { id } = await req.json();

    // Step 2: read json file
    const users = await fsPromises.readFile(usersFilePath, "utf-8");

    // Step 3: parse it into a JSON array
    const jsonArray = JSON.parse(users);

    // Step 4: find the user index of the user to be patched
    const userIndex = jsonArray.findIndex((user: UserProps) => user.id === id);
    console.log(userIndex, "3333");

    // Step 4.1: if user can't be found, return 404
    if (userIndex < 0) {
      return new NextResponse(JSON.stringify({ message: "User not found!" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    // Step 5: remove user from JSON array
    jsonArray.splice(userIndex, 1);

    // Step 6: convert JSON array back to string
    const updatedData = JSON.stringify(jsonArray);

    // Step 7: write the updated data to the JSON file
    await fsPromises.writeFile(usersFilePath, updatedData);

    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully!" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error reading or parsing the JSON file!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
