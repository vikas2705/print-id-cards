import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import APlusCertified from "../assets/APlusCertified.png";

const NewIdCard = ({ student, showinRow }) => {
  const barcodeRef = useRef(null);

  const getDummyImage = (formNo) => {
    return `/avatar/${formNo}_photo.jpg`;
  };

  const getDummySignature = (formNo) => {
    return `/signature/${formNo}_sign.jpg`;
  };

  // Calculate session and valid upto date based on admission date
  const getSessionAndValidUpto = () => {
    let admissionYear = 2024; // Default fallback
    
    if (student?.admission_date) {
      const admissionDate = new Date(student.admission_date);
      admissionYear = admissionDate.getFullYear();
    }
    
    // Session is typically 2 years, starting from admission year
    const sessionStart = admissionYear;
    const sessionEnd = admissionYear + 2;
    const session = `${sessionStart}-${sessionEnd.toString().slice(-2)}`;
    
    // Valid upto is 31-July of the session end year
    const validUpto = `31-July-${sessionEnd}`;
    
    return { session, validUpto };
  };

  const { session, validUpto } = getSessionAndValidUpto();

  // function to generate barcode for registration number and student name
  useEffect(() => {
    if (barcodeRef.current && student?.["Form Number"]) {
      try {
        // Combine form number and student name for barcode
        const barcodeData = `${student?.Name || ""} | ${student["Form Number"]}`;

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
  }, [student]);

  console.log(student);

  return (
    <div
      className={`flex gap-2 ${showinRow ? "flex-row" : "flex-col"}`}
      style={{ transform: showinRow ? "scale(1.4)" : "" }}
    >
      {/* Front Side of ID Card */}
      <div className="w-[350px] h-[204px] border-black bg-white flex flex-col px-1 mt-2">
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
            <div className="text-[11px] text-red-600 leading-tight mr-2">
              (A Central University)
            </div>
            <div className="h-[1px] bg-blue-800 w-[215px] self-center"></div>
            <div className="text-[11px] text-red-700 leading-tight text-center">
              MINISTRY OF EDUCATION, GOVT. OF INDIA
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="pl-1 h-2/3 pb-[2px]">
          <div className="flex items-start justify-between mb-1 w-full">
            <div className="flex items-center text-black font-semibold leading-3 mt-1 gap-0.5">
              <div className="text-red-600 font-semibold text-[11px]">
                Reg.No.
              </div>
              <div className="text-[11px] tracking-tighter">
                {student?.["Form Number"] || ""}
              </div>
            </div>
            <div className="text-center mt-1 place-self-center mr-10">
              <div className="text-[9px] font-semibold text-red-800 leading-3">
                STUDENT ID CARD
              </div>
              <div className="h-[0.5px] bg-red-800 w-[80px] self-center"></div>
              <div className="text-[11px] font-semibold text-red-800 italic leading-3">
                Session ({session})
              </div>
            </div>
            <div className="mt-0.5 mr-0.5">
              <img src={APlusCertified} alt="" height={24} width={24} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              {/* Student Photo */}
              <div class="flex items-center w-[65px] h-[65px]">
                <img
                  src={
                    student?.photo || getDummyImage(student?.["Form Number"])
                  }
                  alt={`${student?.Name || "Student"} profile photo`}
                  className="w-full h-full object-cover border border-gray-300"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between text-[11px] text-black]">
              <div className="flex items-start">
                <span className="min-w-[50px] max-w-[50px] text-start font-bold">
                  NAME{" "}
                </span>
                <span>:</span>
                <span className="mx-2.5 uppercase text-left">
                  {student?.Name || ""}
                </span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[50px] max-w-[50px] text-start font-bold">
                  F-NAME
                </span>
                <span>:</span>
                <span className="mx-2.5 uppercase text-left">
                  {student?.father_name || "--"}
                </span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[50px] max-w-[50px] text-start font-bold">
                  CLASS
                </span>
                <span>:</span>
                <span className="mx-2.5 uppercase">
                  {student?.programName || "--"}
                </span>
              </div>
              <div className="flex items-start">
                <span className="min-w-[50px] max-w-[50px] text-start font-bold">
                  DOB
                </span>
                <span>:</span>
                <span className="mx-2.5 uppercase">{student?.dob || "--"}</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between mt-1">
            {/* Student Signature */}
            <div className="flex flex-col items-start">
              <img
                src={
                  student?.sign || getDummySignature(student?.["Form Number"])
                }
                alt={`${student?.Name || "Student"} signature`}
                className="w-[65px] h-[20px] object-cover"
              />
              <div className="text-[9px] text-black text-center">
                (Student Signature)
              </div>
            </div>

            {/* Barcode Section */}
            <div className="flex flex-col items-center">
              <svg
                ref={barcodeRef}
                className="w-[150px] h-[15px] object-cover"
              />
              {/* <div className="text-[9px] text-black mt-1">
                    {student?.["Form Number"] || ""}
                  </div> */}
            </div>
            {/* Auth Signatory */}
            <div className="flex flex-col items-start">
            <img
                src={
               "/sign-1.png"
                }
                alt={`${student?.Name || "Student"} signature`}
                className="w-[65px] h-[20px] object-cover"
              />
              <div className="text-[9px] text-black self-end min-w-max">
                Auth. Signatory
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side of ID Card */}
      <div className="w-[350px] h-[204px] border-black bg-white flex flex-col relative  overflow-clip mt-1 ml-1">
        {/* Main Content */}
        <div className="pt-1 pl-2 pr-1 text-[11px] text-black flex-1 flex flex-col gap-[2.5px]">
          {/* <div className="flex items-start">
            <span className="min-w-[45px] max-w-[45px] text-start">Per. Address </span>
            <span>:</span>
            <span className="mx-2 text-left line-clamp-2 overflow-hidden leading-tight">
              {student?.permanent_address || ""}
            </span>
          </div> */}
           <div className="flex items-start">
            <span className="min-w-[38px] max-w-[38px] text-start">Corr. Address</span>
            <span>:</span>
            <span className="mx-1 text-left line-clamp-2 overflow-hidden leading-tight">
              {student?.correspondence_address || ""}
            </span>
          </div> 
          <div className="flex items-center justify-between w-full mt-1">
            <div className="flex items-start">
              <span className="min-w-[30px] max-w-[30px] text-start">
                Mobile
              </span>
              <span className="ml-[8px]">:</span>
              <span className="mr-1 ml-[4px]">{student?.mobile || "--"}</span>
            </div>
            <div className="flex items-start">
              <span className="min-w-[30px] max-w-[30px] text-start">
                eMail
              </span>
              <span>:</span>
              <span className="mr-1 italic">{student?.email || "--"}</span>
            </div>
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center">
              <span className="min-w-[55px] max-w-[55px] text-start">
                Adm. Date
              </span>
              <span className="ml-[0px]">:</span>
              <span className="mr-1 ml-[8px]">
                {student?.admission_date ? student.admission_date.split(' ')[0] : "26-06-2024"}
              </span>
            </div>
            {/* Validity Period */}
            <div className="bg-[#b0afae] py-[4px] px-[8px] rounded border-[0.5px] border-black text-[9px] font-bold text-black h-fit flex items-center gap-0.5">
              <div className="text-[8px]">Valid Upto:</div>
              <div className="text-[9px] tracking-tighter">{validUpto}</div>
            </div>
          </div>
          {/* Notes Section */}
          <div className="text-[10px] text-black flex items-start gap-1 leading-[10px]">
            <div className="">Note:</div>
            <div className="flex flex-col items-start italic">
              <div>To reissue the card, you must provide a copy of the police FIR and pay a reissuance fee of ₹100.</div>
            </div>
          </div>
          <div className="flex items-end w-full gap-1">
            <div className="flex-1 h-[0.6px] bg-black mb-1" />
            <div className="font-bold w-fit text-[11px]">For Hostel Use (if applicable)</div>
            <div className="flex-1 h-[0.6px] bg-black mb-1" />
          </div>

          <div className="flex items-end justify-between gap-2">
            <div className="flex items-end gap-1">
              <span className="">No.</span>
              <div className="w-[75px] h-[20px] border-[0.5px] border-black rounded-[1px]"></div>
            </div>
            <div className="flex items-end gap-1">
              <span className="">Room No.</span>
              <div className="w-[75px] h-[20px] border-[0.5px] border-black rounded-[1px]"></div>
            </div>
            <div>(Hostel Warden)</div>
          </div>
        </div>

        {/* Institutional Contact Information */}
        <div className="bg-[#6addee] text-center py-1 absolute bottom-0 left-0 w-full border-t border-black">
          <div className="text-[9px] font-medium">
            <div>B-4, Qutub Institutional Area, New Delhi-110016</div>
            <div>Ph.: 011-46060606 (30 Lines) | Academic: 46060548, 46060503</div>
            <div>Email: academic@slbsrsv.ac.in</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIdCard;
