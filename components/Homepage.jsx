import Link from "next/link";
import React from "react";

const Homepage = () => {
  const data = [
    { name: "Jain", Add: "/jain", view: "/jain/leads" },
    { name: "Emerald", Add: "/emerald", view: "/emerald/leads" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-blue-500 underline pt-10">
        Leads Homepage
      </h1>
      <div className="w-screen h-screen flex justify-center pt-10">
        <div>
          <table
            cellPadding={10}
            cellSpacing={10}
            className="border-collapse border border-gray-400"
          >
            
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">S.No.</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Add Lead</th>
                <th className="border border-gray-400 px-4 py-2">Records</th>
              </tr>
            </thead>

           
            <tbody>
              {data.map((value, i) => (
                <tr key={i} className="border border-gray-400">
                  <td className="border border-gray-400 px-4 py-2">{i + 1}.</td>
                  <td className="font-bold border border-gray-400 px-4 py-2">
                    {value.name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <Link
                      className="text-white bg-blue-500 rounded-xl px-2 py-1"
                      href={value.Add}
                    >
                      Add
                    </Link>
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <Link
                      className="text-white bg-blue-500 rounded-xl px-2 py-1"
                      href={value.view}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Homepage;
