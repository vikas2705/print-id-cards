import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";

const FacultyIDCard = ({ faculty, showinRow }) => {
  const barcodeRef = useRef(null);

  const getDummyImage = (facultyId) => {
    return `/faculty_avatar/${facultyId}_photo.jpg`;
  };

  const getDummySignature = (facultyId) => {
    return `/faculty_signature/${facultyId}_sign.jpg`;
  };

  // Calculate valid upto date based on joining date
  const getValidUpto = () => {
    let joiningYear = new Date().getFullYear(); // Default to current year

    if (faculty?.date_of_joining) {
      const joiningDate = new Date(faculty.date_of_joining);
      joiningYear = joiningDate.getFullYear();
    }

    // Valid upto is typically 5 years from joining date for faculty
    const validityEnd = joiningYear + 5;
    const validUpto = `31-July-${validityEnd}`;

    return validUpto;
  };

  const validUpto = getValidUpto();

  // function to generate barcode for faculty ID and faculty name
  useEffect(() => {
    if (barcodeRef.current && faculty?.faculty_id) {
      try {
        // Combine faculty ID and faculty name for barcode
        const barcodeData = `${faculty?.name || faculty?.name_hindi || ""} | ${faculty.faculty_id}`;

        JsBarcode(barcodeRef.current, barcodeData, {
          format: "CODE128",
          width: 2,
          height: 25,
          displayValue: false,
          background: "#ffffff",
          lineColor: "#000000",
          margin: 0,
        });
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
  }, [faculty]);

  return (
    <div
      className={`flex gap-2 ${showinRow ? "flex-row" : "flex-col"}`}
      style={{ transform: showinRow ? "scale(1.4)" : "" }}
    >
      {/* Front Side of ID Card */}
      <div className="w-[350px] h-[204px] border border-black bg-white flex flex-col px-1 rounded-xl">
        <div className="flex items-center px-2 py-[2px] border-b-2 border-b-blue-800 h-1/3">
          <div className="flex items-center h-full">
            <img
              src="https://slbsrsv.samarth.ac.in/uploads/uims/b8f484f38959e08ff58b9e1cc33e6e7b2a7c4267976468fe2582c247b3c5f7fb1_1642401054_72516497_logo.png"
              alt="University Logo"
              className="w-[65px] h-full object-contain"
            />
          </div>

          <div className="flex flex-col font-medium text-center ml-1">
            <div className="text-[12px] font-medium text-red-600 leading-tight">
              श्री लाल बहादुर शास्त्री राष्ट्रीय संस्कृत विश्वविद्यालय
            </div>
            <div className="text-[12px] text-blue-800 leading-3 font-bold mr-4">
              SHRI LAL BAHADUR SHASTRI
            </div>
            <div className="text-[12px] text-blue-800 leading-3 font-bold mr-4">
              NATIONAL SANSKRIT UNIVERSITY
            </div>
            <div className="text-[8px] text-red-600 leading-tight mr-2">
              (A Central University)
            </div>
            <div className="h-[1px] bg-blue-800 w-[215px] self-center"></div>
            <div className="text-[10px] text-red-700 leading-tight text-center">
              MINISTRY OF EDUCATION, GOVT. OF INDIA
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="pl-1 h-2/3 pb-[2px]">
          <div className="flex items-start justify-end mb-1 w-full">
            <div className="min-w-[40px] max-w-[120px] text-start text-[8px]">
              Accredited 'A' Grade by NAAC
            </div>
          </div>
          <div className="flex gap-2">
            {/* Vertical Barcode */}
            <div className="flex flex-col gap-1">
              <div className="w-[15px] h-[65px] bg-gray-200 border border-gray-300 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-r from-black via-white to-black bg-[length:2px_100%] bg-repeat-x"></div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {/* Student Photo */}
              <div className="flex items-center w-[65px] h-[65px]">
                <img
                  src={
                    faculty?.photo || getDummyImage(faculty?.faculty_id)
                  }
                  alt={`${faculty?.name || faculty?.name_hindi || "Faculty"}`}
                  className="w-full h-full object-cover border border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between text-[8px] text-black my-1">
              <div className="flex items-start">
                <span className="min-w-[40px] max-w-[100px] text-start font-bold text-[12px]">
                  {faculty?.name_hindi || "फैकल्टी नाम"}
                </span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[40px] max-w-[110px] text-start text-[12px] uppercase">
                  {faculty?.name || "FACULTY NAME"}
                </span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[40px] max-w-[100px] text-start text-xs">
                  {faculty?.designation_hindi || "सिस्टम एडमिनिस्ट्रेटर"}
                </span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[40px] max-w-[130px] text-start text-[10px] tracking-wider uppercase">
                  {faculty?.designation || "SYSTEM ADMINISTRATOR"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            {/* Faculty Signature */}
            <div className="flex flex-col items-center">
              <img
                src={
                  faculty?.signature || getDummySignature(faculty?.faculty_id)
                }
                alt={`${faculty?.name || faculty?.name_hindi} signature`}
                className="w-[65px] h-[20px] object-cover"
              />
              <div className="text-[7px] text-black text-center">
                (Faculty Signature)
              </div>
            </div>

            {/* Barcode Section */}
            <div className="flex flex-col items-center">
              <svg
                ref={barcodeRef}
                className="w-[180px] h-[15px] object-cover"
              />
              {/* <div className="text-[7px] text-black mt-1">
                    {student?.["Form Number"] || ""}
                  </div> */}
            </div>
            {/* Auth Signatory */}
            <div className="text-[7px] text-black self-end min-w-max">
              Auth. Signatory
            </div>
          </div>
        </div>
      </div>

      {/* Back Side of ID Card */}
      <div className="w-[350px] h-[204px] border border-black bg-white flex flex-col relative rounded-xl overflow-clip">
        {/* Main Content */}
        <div className="pt-1 pl-2 pr-1 text-[8px] text-black flex-1 flex flex-col gap-[2px]">
          <div className="flex items-start">
            <span className="min-w-[70px] max-w-[70px] text-start">Residence </span>
            <span>:</span>
            <span className="mx-2 text-left line-clamp-3 overflow-hidden leading-tight">
              {faculty?.residence_address
                ? `${faculty.residence_address}${faculty.residence_city ? ', ' + faculty.residence_city : ''}${faculty.residence_state ? ', ' + faculty.residence_state : ''}${faculty.residence_pincode ? ' - ' + faculty.residence_pincode : ''}`
                : "Flat No:03, 3rd FLOOR, SS.REALITY BUILDING, MAIDAN GARHI ROAD, CHHATERPUR ENCLAVE-I,123 Faculty QUARTERS, UNIVERSITY CAMPUT, NEW DELHI - 110016"}
            </span>
          </div>
          {/* Personal Info and Valid Upto Wrapper */}
          <div className="relative flex justify-between w-full mb-2">
            {/* Personal Information */}
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-start">
                <span className="min-w-[70px] max-w-[70px] text-start">Contact No.</span>
                <span>:</span>
                <span className="mx-2 text-left">{faculty?.contact_number || "98XXXXXXXX"}</span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[70px] max-w-[70px] text-start">Date of Birth</span>
                <span>:</span>
                <span className="mx-2 text-left">{faculty?.date_of_birth || "15-08-1985"}</span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[70px] max-w-[70px] text-start">Blood Group</span>
                <span>:</span>
                <span className="mx-2 text-left">{faculty?.blood_group || "B+"}</span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[70px] max-w-[70px] text-start">Date of Joining</span>
                <span>:</span>
                <span className="mx-2 text-left">{faculty?.date_of_joining || "01-July-2020"}</span>
              </div>
            </div>

            {/* Validity Period - positioned at bottom right of wrapper */}
            <div className="absolute bottom-0 right-0 min-w-[40px] max-w-[55px] flex-col bg-[#b0afae] pl-0.5 pr-2.5 py-0.5 rounded border-[0.5px] border-black text-[7px] font-bold text-black h-fit flex items-center gap-0.5">
              <div className="text-[7px]">Valid Upto:</div>
              <div className="text-[7px] tracking-tighter">{validUpto}</div>
            </div>
          </div>
          {/* Notes Section */}
          <div className="text-[8px] text-black flex items-start gap-1 mt-1">
            <div className="flex flex-col items-start italic">
              <div>This card is the property of University and is not transferable. Misuse of this card is an
                offence. Please deposit this card in the office at the time of leaving/retirement from University.
              </div>
            </div>
          </div>
          <div className="text-red-600 font-small text-center mt-1">
            <div>If found please return it to:</div>
            <div>Registar-Office, Shri Lal Bahadur Shastri National Sanskrit University, N.Delhi-16</div>
          </div>
        </div>

        {/* Institutional Contact Information */}
        <div className="bg-[#6addee] text-center py-1 absolute bottom-0 left-0 w-full border-t border-black">
          <div className="text-[7px] font-medium">
            <div>B-4, Qutub Institutional Area, New Delhi-110016</div>
            <div>Ph.: 011-46060606 (30 Lines) | Academic: 46060548, 46060503</div>
            <div>Email: academic@slbsrsv.ac.in</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyIDCard;