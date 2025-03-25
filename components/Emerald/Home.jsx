"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
function Home() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    field_class_looking_for: "",
    field_preferred_campus: "",
    message: "",
  });

  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handlesubmit(e) {
    setData({ ...data, message: "loading" });
    e.preventDefault();
    if (
      data.name !== "" &&
      data.mobile !== "" &&
      data.field_class_looking_for != "" &&
      data.field_preferred_campus !== ""
    ) {
      try {
        delete data.message;
        console.log(data);
        const response1 = await axios.post("/api/emerald", data);
        console.log(response1);
        if (response1.status === 200) {
          setData({
            name: "",
            email: "",
            mobile: "",
            field_class_looking_for: "",
            field_preferred_campus: "",
            message: "Lead Added",
          });
        }
      } catch (e) {
        console.log(e?.response?.data?.message);
        setData({ ...data, message: e?.response?.data?.message });
      }
    } else {
      setData({ ...data, message: "*Fields are mandatory" });
    }
  }
  return (
    <>
      <div className="  flex justify-center pt-3 sm:pt-0 lg:items-center  p-2 bg-white   h-screen w-screen">
        <form
          onSubmit={handlesubmit}
          className=" flex gap-3 flex-col border bg-gray-100   border-gray-300 p-5 w-[87vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw]  "
        >
          <div className=" flex justify-between">
            <p className=" text-xl font-bold underline ">Add Lead</p>
            <Link
              href="/emerald/leads"
              className=" text-xl font-bold underline "
            >
              Sent Leads
            </Link>
          </div>
          <input
            onChange={handle}
            value={data.name}
            name="name"
            type="text"
            className=" border border-gray-300 p-1"
            placeholder="Enter Student Name *"
          />
          <input
            onChange={handle}
            value={data.email}
            name="email"
            type="email"
            className=" border border-gray-300 p-1"
            placeholder="Enter Email Address *"
          />

          <input
            type="number"
            onChange={handle}
            value={data.mobile}
            name="mobile"
            className=" border border-gray-300 p-1"
            placeholder="Enter Mobile Number"
          />
          <select
            className=" border border-gray-300 p-1 "
            value={data.field_class_looking_for}
            name="field_class_looking_for"
            onChange={handle}
          >
            <option value="">Select Grade</option>

            <option value="Grade 4">4</option>
            <option value="Grade 5">5</option>
            <option value="Grade 6">6</option>
            <option value="Grade 7">7</option>
            <option value="Grade 8">8</option>
            <option value="Grade 9">9</option>
            <option value="Grade 10">10</option>
            <option value="Grade 11">11</option>
            <option value="Grade 12">12</option>
          </select>
          <select
            className=" border border-gray-300 p-1 "
            onChange={handle}
            name="field_preferred_campus"
            value={data.field_preferred_campus}
          >
            <option value="">Select Campus</option>
            <option value="Indore">Indore</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
          <button
            type="submit"
            className=" bg-blue-500 text-white rounded-md h-8 hover:bg-blue-800 "
          >
            Submit
          </button>
          <p className=" text-red-500 ">{data.message}</p>
        </form>
      </div>
    </>
  );
}

export default Home;
