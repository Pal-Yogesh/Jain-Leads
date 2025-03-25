import { NextResponse } from "next/server";
import axios from "axios";
import Emerald from "@/app/models/emerald";
import connectDB from "@/app/dbconfig/connect";

connectDB();

export async function POST(req) {
  try {
    const {
      name,
      email,
      mobile,
      field_class_looking_for,
      field_preferred_campus,
    } = await req.json();

    const config = {
      method: "post",
      url: `https://api.nopaperforms.io/lead/v1/create`,
      headers: {
        "Content-Type": "application/json",
        "access-key": "fa6481e10ce54b04acb4a92f6f3ec2de",
        "secret-key": "8824cb63775d26a2d8acd16fe4666113",
      },
      data: {
        name,
        email,
        mobile,
        field_class_looking_for,
        field_preferred_campus,
        source: "Edu123",
      },
    };

    const apiResponse = await axios(config);
    console.log("apiResponse", apiResponse.data);

    if (apiResponse.data.message === "Lead has been created successfully.") {
      const lead = await Emerald.create({
        name,
        email,
        mobile,
        field_class_looking_for,
        field_preferred_campus,
      });
      return NextResponse.json(
        { lead, responseData: apiResponse.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: apiResponse.data.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await Emerald.find({});
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const lead = await Emerald.findById(id);
    if (!lead) {
      return NextResponse.json(
        { message: "Emerald not found" },
        { status: 404 }
      );
    }

    await Emerald.findByIdAndDelete(id);
    return NextResponse.json({ message: "Lead Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
