import React, { useRef, useState } from "react";
import NewIdCard from "./NewIdCard";

const Template = () => {
    return (
        // <div className=" rounded-lg flex flex-col shadow-xl h-[422px] bg-[#E6E7EC]">
            <div className="p-4 flex flex-col gap-4 shadow-xl rounded-lg bg-[#E6E7EC] h-[422px] w-[1031px]" >
                <div className="flex items-center justify-between ">
                    <div className="font-semibold pl-4 text-[#132963]">TEMPLATE PREVIEW</div>
                    <div className="flex items-center bg-[#132963] rounded-full justify-between gap-2 pl-5 pr-4 w-[125px] h-[39px] p-2">
                        <div className="text-[#E5E5E5]">Student</div>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.281071 0.645131C0.452842 0.479869 0.683198 0.389564 0.921518 0.394061C1.15984 0.398557 1.38662 0.497488 1.55204 0.669112L6.00042 5.39088L10.4488 0.669112C10.5297 0.579971 10.6276 0.507967 10.7368 0.457367C10.846 0.406767 10.9642 0.3786 11.0845 0.374536C11.2048 0.370472 11.3247 0.390593 11.437 0.433707C11.5494 0.476821 11.652 0.542051 11.7387 0.625531C11.8253 0.709011 11.8944 0.809043 11.9417 0.919699C11.989 1.03036 12.0137 1.14939 12.0141 1.26974C12.0146 1.39008 11.9909 1.5093 11.9445 1.62033C11.898 1.73136 11.8298 1.83194 11.7438 1.9161L6.6479 7.31172C6.56401 7.39875 6.46344 7.46798 6.35219 7.51526C6.24094 7.56254 6.1213 7.58692 6.00042 7.58692C5.87954 7.58692 5.75991 7.56254 5.64866 7.51526C5.53741 7.46798 5.43684 7.39875 5.35295 7.31172L0.25709 1.9161C0.0918282 1.74433 0.00152299 1.51397 0.0060196 1.27565C0.0105162 1.03733 0.109447 0.810546 0.281071 0.645131Z" fill="white" />
                        </svg>
                    
                    </div>
                </div>

                {/* Cards Container */}
                <div className="flex justify-center gap-20 h-[317px] w-[992px] mt-[80px]">
                <NewIdCard showinRow />
                </div>
            </div>
        // </div>
    );
};

export default Template;
