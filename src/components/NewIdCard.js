import React, { useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";

const NewIdCard = ({ student }) => {
  const barcodeRef = useRef(null);

  const getDummyImage = (formNo) => {
    return `/avatar/${formNo}_photo.jpg`;
  };

  const getDummySignature = (formNo) => {
    return `/signature/${formNo}_sign.jpg`;
  };

  // function to generate barcode for registration number
  useEffect(() => {
    if (barcodeRef.current && student?.["Form Number"]) {
      try {
        JsBarcode(barcodeRef.current, student["Form Number"], {
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

  return (
    <div className="flex flex-col gap-2">
      {/* Front Side of ID Card */}
      <div className="w-[350px] h-[204px] border border-black bg-white flex flex-col px-1 rounded-xl">
        <div className="flex items-center p-2 border-b-2 border-b-blue-800 h-1/3">
          <img
            src="https://slbsrsv.samarth.ac.in/uploads/uims/b8f484f38959e08ff58b9e1cc33e6e7b2a7c4267976468fe2582c247b3c5f7fb1_1642401054_72516497_logo.png"
            alt="University Logo"
            className="w-[55px] h-[50px]"
          />
          <div className="flex flex-col font-medium">
            <div className="text-[10px] font-medium text-red-600 leading-tight tracking-wider">
              श्री लाल बहादुर शास्त्री राष्ट्रीय संस्कृत विश्वविद्यालय
            </div>
            <div className="text-[12px] text-blue-800 leading-3 px-6">
              SHRI LAL BAHADUR SHASTRI
            </div>
            <div className="text-[12px] text-blue-800 leading-3 px-6">
              NATIONAL SANSKRIT UNIVERSITY
            </div>
            <div className="text-[10px] text-red-600 leading-tight">
              (A Central University)
            </div>
            <div className="h-[1px] bg-blue-800 w-[100px] self-center"></div>
            <div className="text-[10px] text-red-700 leading-tight">
              MINISTRY OF EDUCATION, GOVT. OF INDIA
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="pl-2 h-2/3 pb-[2px]">
          <div className="flex items-start justify-between mb-1 w-full">
            <div className="flex flex-col items-start text-black font-semibold leading-3 mt-1">
              <div className="text-red-600 font-semibold text-[10px]">
                Reg.No.
              </div>
              <div className="text-[7px] tracking-tighter">
                {student?.["Form Number"] || ""}
              </div>
            </div>
            <div className="text-center mt-1 place-self-center ml-8">
              <div className="text-[9px] font-semibold text-red-800 leading-3">
                IDENTITY CARD
              </div>
              <div className="h-[0.5px] bg-red-800 w-[80px] self-center"></div>
              <div className="text-[8px] font-semibold text-red-800 italic leading-3">
                Session (2024-26)
              </div>
            </div>
            <div className="text-[7px] font-medium text-black text-right italic">
              Accredited 'A++' Grade by NAAC
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

              {/* Student Signature */}
              <div className="flex flex-col items-center">
                <img
                  src={
                    student?.sign || getDummySignature(student?.["Form Number"])
                  }
                  alt={`${student?.Name || "Student"} signature`}
                  className="w-[35px] h-[20px] object-contain"
                />
                <div className="text-[7px] text-black text-center">
                  (Student Signature)
                </div>
              </div>
            </div>
            <div className="text-[8px] text-black flex flex-col items-start justify-between gap-[2px] flex-1">
              <div className="flex flex-col items-start justify-start gap-[2px]">
                <div className="flex items-start mt-1">
                  <span className="min-w-[40px] max-w-[40px] text-start font-bold">NAME </span>
                  <span>:</span>
                  <span className="mx-2.5 uppercase text-left">
                    {student?.Name || ""}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="min-w-[40px] max-w-[40px] text-start font-bold">F-NAME</span>
                  <span>:</span>
                  <span className="mx-2.5 uppercase text-left">
                    {student?.father_name || "--"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="min-w-[40px] max-w-[40px] text-start font-bold">CLASS</span>
                  <span>:</span>
                  <span className="mx-2.5 uppercase">
                    {student?.programName || "--"}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="min-w-[40px] max-w-[40px] text-start font-bold">DOB</span>
                  <span>:</span>
                  <span className="mx-2.5 uppercase">
                    {student?.dob || "--"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2 w-full">
                {/* Barcode Section */}
                <div className="flex flex-col items-center mb-3 ml-0.5">
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
        </div>
      </div>

      {/* Back Side of ID Card */}
      <div className="w-[350px] h-[204px] border border-black bg-white flex flex-col relative rounded-xl overflow-clip">
        {/* Main Content */}
        <div className="pt-1 pl-2 pr-1 text-[8px] text-black flex-1 flex flex-col gap-[2.5px]">
          <div className="flex items-start">
            <span className="min-w-[70px] max-w-[70px] text-start">Permanent Address </span>
            <span>:</span>
            <span className="mx-2 text-left">
              {student?.permanent_address
                ? `${student?.permanent_address}`
                : ""}
              {student?.permanent_state || ""}
              {student?.permanent_pincode || ""}
            </span>
          </div>
          <div className="flex items-start">
            <span className="min-w-[70px] max-w-[70px] text-start">Correspondence Address</span>
            <span>:</span>
            <span className="mx-2 text-left">AS ABOVE</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-start">
              <span className="min-w-[30px] max-w-[30px] text-start">Mobile</span>
              <span>:</span>
              <span className="mx-1">{student?.mobile || "--"}</span>
            </div>
            <div className="flex items-start">
              <span className="min-w-[30px] max-w-[30px] text-start">E-Mail</span>
              <span>:</span>
              <span className="mx-1 italic">{student?.email || "--"}</span>
            </div>
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center">
              <span className="min-w-[45px] max-w-[45px] text-start">Adm. Date</span>
              <span>:</span>
              <span className="mx-1">
                {student?.admission_date || "26-06-2024"}
              </span>
            </div>
            {/* Validity Period */}
            <div className="bg-[#b0afae] pl-0.5 pr-2.5 py-1 rounded border-[0.5px] border-black text-[7px] font-bold text-black h-fit flex items-center gap-0.5">
              <div className="text-[7px]">Valid Upto:</div>
              <div className="text-[7px] tracking-tighter">Session 2024-26</div>
            </div>
          </div>
          {/* Notes Section */}
          <div className="text-[8px] text-black flex items-start gap-1">
            <div className="">Note:</div>
            <div className="flex flex-col items-start italic">
              <div>1. Notify Office / Police if card get lost.</div>
              <div>
                2. Deposit Rs.100/- in the office for re-issuing the card.
              </div>
            </div>
          </div>
          <div className="flex items-end w-full gap-1">
            <div className="flex-1 h-[0.6px] bg-black mb-1" />
            <div className="font-bold w-fit text-[10px]">For Hostel Use</div>
            <div className="flex-1 h-[0.6px] bg-black mb-1" />
          </div>

          <div className="flex items-end justify-between gap-2">
            <div className="flex items-end gap-1">
              <span className="">No.</span>
              <div className="w-[90px] h-[20px] border-[0.5px] border-black rounded-[1px]"></div>
            </div>
            <div className="flex items-end gap-1">
              <span className="">Room No.</span>
              <div className="w-[90px] h-[20px] border-[0.5px] border-black rounded-[1px]"></div>
            </div>
            <div>(Hostel Warden)</div>
          </div>
        </div>

        {/* Institutional Contact Information */}
        <div className="bg-[#6addee] text-center py-1 absolute bottom-0 left-0 w-full border-t border-black">
          <div className="text-[7px] font-medium">
            <div>B-4, Qutub Institutional Area, New Delhi-110016</div>
            <div>Ph.: 011-46060606 (30 Lines) | Fax: 26533512, 26520255,</div>
            <div>Email: info@slbsrsv.ac.in | www.slbsrsv.ac.in</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewIdCard;
