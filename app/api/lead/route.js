import { NextResponse } from "next/server";
import axios from "axios";
import Lead from "@/app/models/lead";
import connectDB from "@/app/dbconfig/connect";

connectDB();

export async function POST(req) {
  try {
    const {
      student_name,
      email,
      mobile,
      country,
      state,
      city,
      grade,
      curriculum,
      dialcode,
    } = await req.json();

    const config = {
      method: "post",
      url: `https://api.in5.nopaperforms.com/dataporting/5088/edumynation`,
      data: {
        student_name,
        email,
        mobile,
        country,
        state,
        city,
        grade,
        curriculum,
        dialcode,
        secret_key: "1aae200e312b15750af4bd2b674b3726",
        source: "edumynation",
        college_id: 5088,
      },
    };

    const apiResponse = await axios(config);
    console.log(apiResponse.data);

    if (apiResponse.data.status === "Success") {
      const lead = await Lead.create({
        student_name,
        email,
        mobile,
        country,
        state,
        city,
        grade,
        curriculum,
        dialcode,
      });
      console.log("success");
      return NextResponse.json(
        { lead: lead, responseData: apiResponse.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: apiResponse.data }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
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

    const lead = await Lead.findById(id);
    if (!lead) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ message: "Lead deleted" }, { status: 200 });


  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
