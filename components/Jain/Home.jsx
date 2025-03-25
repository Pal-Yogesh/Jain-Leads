"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from "axios";
import Link from "next/link";
let a = "";
function Home() {
  const initial = {
    student_name: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    grade: "",
    curriculum: "",
    countryid: null,
    stateid: null,
    dialcode: "",
    message: "",
  };

  const [data, setData] = useState(initial);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const handleOnChange = (value, country, e, formattedValue) => {
    setData({ ...data, mobile: value, dialcode: "+" + country.dialCode });
  };
  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  async function handlesubmit(e) {
    setData({ ...data, message: "loading" });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    e.preventDefault();
    if (
      data.student_name !== "" &&
      emailRegex.test(data.email) &&
      data.mobile != ""
    ) {
      try {
        a = data.mobile;
        data.mobile = data.mobile.slice(2);
        console.log(data);
        const response1 = await axios.post("/api/lead", {
          student_name: data.student_name,
          email: data.email,
          mobile: data.mobile,
          country: data.country,
          state: data.state,
          city: data.city,
          grade: data.grade,
          curriculum: data.curriculum,
          dialcode: data.dialcode,
        });
        if (response1.status === 200) {
          setData({ ...initial, message: "Lead Added" });
        } else {
          console.log(response1);
          setData({
            ...data,
            mobile: a,
            message: response1.data.message || "An error occurred",
          });
        }
      } catch (e) {
        console.log(e);
        setData({ ...data, mobile: a, message: e.response?.data?.message });
      }
    } else {
      setData({
        ...data,
        mobile: a,
        message: "*Name,Email,Mobile are mandatory",
      });
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
            <Link href="/jain/leads" className=" text-xl font-bold underline ">
              Sent Leads
            </Link>
          </div>
          <input
            onChange={handle}
            value={data.student_name}
            name="student_name"
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
          <PhoneInput
            country={"in"}
            value={data.mobile}
            onChange={handleOnChange}
            containerClass=" "
          />
          <CountrySelect
            onChange={(e) => {
              setData({ ...data, countryid: e.id, country: e.name });
            }}
            placeHolder="Select Country"
          />
          <StateSelect
            countryid={data.countryid}
            onChange={(e) => {
              setData({ ...data, stateid: e.id, state: e.name });
            }}
            placeHolder="Select State"
          />
          <input
            type="text"
            onChange={handle}
            value={data.city}
            name="city"
            className=" border border-gray-300 p-1"
            placeholder="Enter City"
          />
          <select
            className=" border border-gray-300 p-1 "
            value={data.grade}
            name="grade"
            onChange={handle}
          >
            <option value="">Select Grade</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            className=" border border-gray-300 p-1 "
            onChange={handle}
            name="curriculum"
            value={data.curriculum}
          >
            <option value="">Select Curriculum</option>
            <option value="CBSE">CBSE</option>
            <option value="CIE">CIE</option>
            <option value="IBDP">IBDP</option>
          </select>
          <button
            type="submit"
            className=" bg-blue-500 text-white rounded-md h-8 hover:bg-blue-800 "
          >
            Submit
          </button>
          {/* <p className=" text-red-500 ">{data.message}</p> */}
          <p className="text-red-500">
            {typeof data.message === "string"
              ? data.message
              : JSON.stringify(data.message)}
          </p>
        </form>
      </div>
    </>
  );
}

export default Home;
