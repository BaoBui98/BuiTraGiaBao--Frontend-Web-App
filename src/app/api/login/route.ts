import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

import crypto from "crypto";
import { UserProps } from "@/types";

const usersFilePath = path.join(process.cwd(), "public/mocks/login.json");

export async function POST(req: NextRequest) {
  try {
    // Step 1: Read the JSON file containing users' data
    const usersData = await fsPromises.readFile(usersFilePath, "utf-8");

    // Step 2: Parse the data into a JSON array
    const jsonArray = JSON.parse(usersData);

    // Step 3: Destructure values from the request body
    const { email, password } = await req.json();

    // Step 4: Find the user with the matching email
    const user = jsonArray.find((user: any) => user.email === email);

    // Step 5: Validate the user's credentials
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Email không tồn tại!" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );
    }

    // Check if the password matches
    if (user.password !== password) {
      return new NextResponse(
        JSON.stringify({ message: "Mật khẩu không đúng!" }),
        { status: 401, headers: { "content-type": "application/json" } } // Unauthorized status code
      );
    }

    // Step 6: Successful login response
    const accessToken = crypto.randomBytes(32).toString("hex"); // Example: JWT or any unique identifier
    const { password: _, ...userWithoutPassword } = user;
    return new NextResponse(
      JSON.stringify({
        message: "Đăng nhập thành công!",
        user: userWithoutPassword,
        access_token: accessToken,
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing the login request:", error);
    return new NextResponse(
      JSON.stringify({ message: "Có lỗi xảy ra trong quá trình đăng nhập!" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
