"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Leads() {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  async function getdata() {
    try {
      const response = await axios.get("/api/emerald");

      if (response.status === 200) {
        console.log(response.data);
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getdata();
  }, [toggle]);
  async function handledelete(_id) {
    try {
      const response = await axios.delete(`/api/emerald?id=${_id}`);
      if (response.status === 200) {
        setToggle(!toggle);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1 className="text-center underline mt-3 text-3xl font-bold text-blue-500 ">
        Emerald Leads
      </h1>
      <div className="float-right space-x-3 mr-10 mb-8 ">
        <Link
          className="bg-blue-500 text-white px-2 py-1 rounded-md"
          href="/emerald"
        >
          Add Leads
        </Link>
        <Link className="bg-blue-500 text-white px-2 py-1 rounded-md" href="/">
          Home
        </Link>
      </div>
      <div className=" w-full h-full flex justify-center  mt-7  ">
        <table
          cellPadding={10}
          cellSpacing={10}
          className=" border border-black"
        >
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>field_class_looking_for</th>
              <th>field_prefferred_campus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{value?.name}</td>
                <td>{value?.mobile}</td>
                <td>{value?.email}</td>
                <td>{value?.field_class_looking_for}</td>
                <td>{value?.field_preferred_campus}</td>
                <td>
                  <button
                    onClick={() => handledelete(value?._id)}
                    className="   bg-red-500 text-white rounded-full px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leads;
