import React, { useRef, useState } from "react";

const Template = () => {
    return (
        <div className="flex flex-col gap-10 shadow-xl">
            <div className="rounded-lg p-4 bg-[#C5C4C4] space-y-2 flex flex-col gap-4 ">
                <div className="flex items-center justify-between ">
                    <div className="font-semibold flex w-full items-center justify-center">TEMPLATE PREVIEW</div>
                </div>

                {/* Cards Container */}
                <div className="flex justify-center gap-20">
                    {/* First Card */}
                    <div className="bg-[#D9D9D9] w-[410px] h-[268px] rounded-lg p-2 overflow-hidden flex flex-col items-start">
                        {/* Logo and Title */}
                        <div className="flex p-4 items-start w-full gap-6">
                            {/* LOGO */}
                            <div className="flex items-center gap-2 rounded-full bg-[#525252] w-16 h-16 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
                                    <g clip-path="url(#clip0_159_1133)">
                                        <path d="M15.0007 1.5C14.621 1.5 14.246 1.56562 13.8898 1.69219L0.741347 6.44062C0.296034 6.60469 0.000721513 7.02656 0.000721513 7.5C0.000721513 7.97344 0.296034 8.39531 0.741347 8.55938L3.45541 9.53906C2.68666 10.7484 2.25072 12.1781 2.25072 13.6828V15C2.25072 16.3313 1.74447 17.7047 1.20541 18.7875C0.900722 19.3969 0.553847 19.9969 0.150722 20.55C0.000721514 20.7516 -0.041466 21.0141 0.042909 21.2531C0.127284 21.4922 0.324159 21.6703 0.567909 21.7313L3.56791 22.4813C3.76478 22.5328 3.97572 22.4953 4.14916 22.3875C4.3226 22.2797 4.44447 22.1016 4.48197 21.9C4.8851 19.8938 4.68353 18.0938 4.38353 16.8047C4.23353 16.1391 4.03197 15.4594 3.75072 14.8359V13.6828C3.75072 12.2672 4.22885 10.9312 5.05853 9.8625C5.66322 9.13594 6.44603 8.55 7.36478 8.18906L14.7242 5.29688C15.1085 5.14687 15.5445 5.33437 15.6945 5.71875C15.8445 6.10313 15.657 6.53906 15.2726 6.68906L7.91322 9.58125C7.33197 9.81094 6.82103 10.1625 6.40385 10.5938L13.8851 13.2938C14.2413 13.4203 14.6163 13.4859 14.996 13.4859C15.3757 13.4859 15.7507 13.4203 16.107 13.2938L29.2601 8.55938C29.7054 8.4 30.0007 7.97344 30.0007 7.5C30.0007 7.02656 29.7054 6.60469 29.2601 6.44062L16.1117 1.69219C15.7554 1.56562 15.3804 1.5 15.0007 1.5ZM6.00072 19.125C6.00072 20.7797 10.032 22.5 15.0007 22.5C19.9695 22.5 24.0007 20.7797 24.0007 19.125L23.2835 12.3094L16.6179 14.7188C16.0976 14.9062 15.5492 15 15.0007 15C14.4523 15 13.8992 14.9062 13.3835 14.7188L6.71791 12.3094L6.00072 19.125Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_159_1133">
                                            <path d="M0 0H30V24H0V0Z" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="flex-wrap flex flex-col">
                                <div className="text-[14px] ">SHRI LAL BHADUR SHASTRI</div>
                                <div className="text-[14px]">NATIONAL SANSKRIT UNIVERSITY</div>
                                <div className="text-[12px] text-[#525252]">(Central University, Govt. of India)</div>
                            </div>
                        </div>
                        {/* Image and Details */}
                        <div className="flex pl-4 items-start w-full gap-2">
                            {/* PHOTO and DOB+BloodGroup */}
                            <div className="flex flex-col gap-2">
                                <div className="w-[130px] h-[115px] rounded-lg bg-[#A3A3A3] flex place-items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45" fill="none">
                                        <g clip-path="url(#clip0_159_1100)">
                                            <g clip-path="url(#clip1_159_1100)">
                                                <path d="M23.4982 13.4377C25.2801 13.4377 26.9891 12.7298 28.2491 11.4698C29.5092 10.2097 30.217 8.50078 30.217 6.71884C30.217 4.93689 29.5092 3.22793 28.2491 1.9679C26.9891 0.707875 25.2801 0 23.4982 0C21.7163 0 20.0073 0.707875 18.7473 1.9679C17.4872 3.22793 16.7794 4.93689 16.7794 6.71884C16.7794 8.50078 17.4872 10.2097 18.7473 11.4698C20.0073 12.7298 21.7163 13.4377 23.4982 13.4377ZM21.0994 15.9572C15.929 15.9572 11.7402 20.146 11.7402 25.3164C11.7402 26.1772 12.4384 26.8753 13.2992 26.8753H33.6972C34.558 26.8753 35.2562 26.1772 35.2562 25.3164C35.2562 20.146 31.0674 15.9572 25.897 15.9572H21.0994Z" fill="white" />
                                            </g>
                                        </g>
                                        <path d="M1.32122 39.2627V29.4898H4.62338C5.39006 29.4898 6.01677 29.6282 6.50351 29.905C6.99342 30.1786 7.35609 30.5492 7.5915 31.0169C7.82691 31.4845 7.94462 32.0062 7.94462 32.582C7.94462 33.1578 7.82691 33.6812 7.5915 34.152C7.35927 34.6228 6.99978 34.9982 6.51305 35.2782C6.02632 35.5549 5.40279 35.6933 4.64247 35.6933H2.2756V34.6435H4.60429C5.1292 34.6435 5.55072 34.5528 5.86884 34.3715C6.18697 34.1902 6.41761 33.9452 6.56077 33.6366C6.70711 33.3249 6.78028 32.9733 6.78028 32.582C6.78028 32.1907 6.70711 31.8408 6.56077 31.5322C6.41761 31.2236 6.18538 30.9819 5.86407 30.8069C5.54276 30.6287 5.11647 30.5397 4.5852 30.5397H2.50465V39.2627H1.32122ZM9.85099 39.2627V29.4898H11.0344V33.8418H16.2453V29.4898H17.4288V39.2627H16.2453V34.8916H11.0344V39.2627H9.85099ZM28.0439 34.3763C28.0439 35.407 27.8578 36.2978 27.4856 37.0485C27.1133 37.7993 26.6028 38.3783 25.9538 38.7855C25.3048 39.1927 24.5636 39.3963 23.7301 39.3963C22.8966 39.3963 22.1553 39.1927 21.5064 38.7855C20.8574 38.3783 20.3468 37.7993 19.9746 37.0485C19.6024 36.2978 19.4163 35.407 19.4163 34.3763C19.4163 33.3455 19.6024 32.4548 19.9746 31.704C20.3468 30.9532 20.8574 30.3742 21.5064 29.967C22.1553 29.5598 22.8966 29.3562 23.7301 29.3562C24.5636 29.3562 25.3048 29.5598 25.9538 29.967C26.6028 30.3742 27.1133 30.9532 27.4856 31.704C27.8578 32.4548 28.0439 33.3455 28.0439 34.3763ZM26.8986 34.3763C26.8986 33.5301 26.757 32.8159 26.4739 32.2337C26.194 31.6515 25.8138 31.2109 25.3334 30.9119C24.8562 30.6128 24.3218 30.4633 23.7301 30.4633C23.1384 30.4633 22.6023 30.6128 22.1219 30.9119C21.6447 31.2109 21.2646 31.6515 20.9815 32.2337C20.7015 32.8159 20.5615 33.5301 20.5615 34.3763C20.5615 35.2225 20.7015 35.9367 20.9815 36.5189C21.2646 37.101 21.6447 37.5416 22.1219 37.8407C22.6023 38.1397 23.1384 38.2892 23.7301 38.2892C24.3218 38.2892 24.8562 38.1397 25.3334 37.8407C25.8138 37.5416 26.194 37.101 26.4739 36.5189C26.757 35.9367 26.8986 35.2225 26.8986 34.3763ZM29.0925 30.5397V29.4898H36.4221V30.5397H33.349V39.2627H32.1656V30.5397H29.0925ZM46.0876 34.3763C46.0876 35.407 45.9015 36.2978 45.5293 37.0485C45.1571 37.7993 44.6465 38.3783 43.9975 38.7855C43.3485 39.1927 42.6073 39.3963 41.7738 39.3963C40.9403 39.3963 40.1991 39.1927 39.5501 38.7855C38.9011 38.3783 38.3905 37.7993 38.0183 37.0485C37.6461 36.2978 37.46 35.407 37.46 34.3763C37.46 33.3455 37.6461 32.4548 38.0183 31.704C38.3905 30.9532 38.9011 30.3742 39.5501 29.967C40.1991 29.5598 40.9403 29.3562 41.7738 29.3562C42.6073 29.3562 43.3485 29.5598 43.9975 29.967C44.6465 30.3742 45.1571 30.9532 45.5293 31.704C45.9015 32.4548 46.0876 33.3455 46.0876 34.3763ZM44.9424 34.3763C44.9424 33.5301 44.8008 32.8159 44.5177 32.2337C44.2377 31.6515 43.8575 31.2109 43.3772 30.9119C42.9 30.6128 42.3655 30.4633 41.7738 30.4633C41.1821 30.4633 40.6461 30.6128 40.1657 30.9119C39.6885 31.2109 39.3083 31.6515 39.0252 32.2337C38.7453 32.8159 38.6053 33.5301 38.6053 34.3763C38.6053 35.2225 38.7453 35.9367 39.0252 36.5189C39.3083 37.101 39.6885 37.5416 40.1657 37.8407C40.6461 38.1397 41.1821 38.2892 41.7738 38.2892C42.3655 38.2892 42.9 38.1397 43.3772 37.8407C43.8575 37.5416 44.2377 37.101 44.5177 36.5189C44.8008 35.9367 44.9424 35.2225 44.9424 34.3763Z" fill="white" />
                                        <defs>
                                            <clipPath id="clip0_159_1100">
                                                <rect width="23.5159" height="26.8753" fill="white" transform="translate(11.7402)" />
                                            </clipPath>
                                            <clipPath id="clip1_159_1100">
                                                <path d="M11.7402 0H35.2562V26.8753H11.7402V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <div className="flex flex-col justify-center items-center gap-1">
                                        <p className="text-[8px] text-[#404040]">D.O.B</p>
                                        <div className="rounded-sm bg-[#E5E5E5] w-[42px] h-[10px]"></div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-1">
                                        <p className="text-[8px] text-[#404040]">BLOOD GROUP</p>
                                        <div className="rounded-sm bg-[#E5E5E5] w-[42px] h-[10px]"></div>
                                    </div>
                                </div>
                            </div>
                            {/* DETAILS */}
                            <div className="flex flex-col gap-[1.5px] px-4 -mt-1">
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-[8px] text-[#404040]">NAME</p>
                                    <div className="rounded-sm bg-[#E5E5E5] w-[157px] h-[10px] mb-1"></div>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-[8px] text-[#404040]">ENROLMENT NO.</p>
                                    <div className="rounded-sm bg-[#E5E5E5] w-[157px] h-[10px] mb-1"></div>
                                </div><div className="flex flex-col items-start gap-1">
                                    <p className="text-[8px] text-[#404040]">PROGRAMME</p>
                                    <div className="rounded-sm bg-[#E5E5E5] w-[157px] h-[10px] mb-1"></div>
                                </div><div className="flex flex-col items-start gap-1">
                                    <p className="text-[8px] text-[#404040]">MOBILE NO.</p>
                                    <div className="rounded-sm bg-[#E5E5E5] w-[157px] h-[10px] mb-1"></div>
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-[8px] text-[#404040]">VALIDITY</p>
                                    <div className="rounded-sm bg-[#E5E5E5] w-[157px] h-[10px] mb-1"></div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Second Card */}
                    <div className="bg-[#D9D9D9] w-[410px] h-[268px] rounded-lg p-4 flex flex-col items-center gap-2">
                        {/* Content for the second card */}
                        {/* BARCODE CONTAINER */}
                        <div className="bg-[#525252] w-[348px] h-[64px] rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="32" viewBox="0 0 80 32" fill="none">
                                {/* <path d="M80 32H0V0H80V32Z" stroke="#E5E7EB" /> */}
                                <path d="M4 32H0V0H4V32Z" fill="white" />
                                <path d="M4 32H0V0H4V32Z" stroke="#E5E7EB" />
                                <path d="M16 32H8V0H16V32Z" fill="white" />
                                <path d="M16 32H8V0H16V32Z" stroke="#E5E7EB" />
                                <path d="M24 32H20V0H24V32Z" fill="white" />
                                <path d="M24 32H20V0H24V32Z" stroke="#E5E7EB" />
                                <path d="M40 32H28V0H40V32Z" fill="white" />
                                <path d="M40 32H28V0H40V32Z" stroke="#E5E7EB" />
                                <path d="M48 32H44V0H48V32Z" fill="white" />
                                <path d="M48 32H44V0H48V32Z" stroke="#E5E7EB" />
                                <path d="M60 32H52V0H60V32Z" fill="white" />
                                <path d="M60 32H52V0H60V32Z" stroke="#E5E7EB" />
                                <path d="M68 32H64V0H68V32Z" fill="white" />
                                <path d="M68 32H64V0H68V32Z" stroke="#E5E7EB" />
                                <path d="M80 32H72V0H80V32Z" fill="white" />
                                <path d="M80 32H72V0H80V32Z" stroke="#E5E7EB" />
                            </svg>
                        </div>
                        {/* CODE */}
                        <div className="text-[#525252] text-[12px]">
                            *123456789012*
                        </div>
                        <div className="bg-white w-[348px] h-[142px] p-4 flex flex-col rounded-sm">
                            <p className="text-[14px] mb-2">If found, please return to:</p>
                            <p className="text-[12px]">Shri Lal Bahadur Shastri National</p>
                            <p className="text-[12px]">Sanskrit University</p>
                            <p className="text-[12px]">Kotwa Jamunipur, Sultanpur Road</p>
                            <p className="text-[12px]">New Delhi - 110036</p>

                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-center">
                    <div className="flex items-center bg-white rounded-full justify-between gap-2 pl-5 pr-4 w-[125px] h-[39px] p-2">
                        <div>Student</div>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.281071 0.645131C0.452842 0.479869 0.683198 0.389564 0.921518 0.394061C1.15984 0.398557 1.38662 0.497488 1.55204 0.669112L6.00042 5.39088L10.4488 0.669112C10.5297 0.579971 10.6276 0.507967 10.7368 0.457367C10.846 0.406767 10.9642 0.3786 11.0845 0.374536C11.2048 0.370472 11.3247 0.390593 11.437 0.433707C11.5494 0.476821 11.652 0.542051 11.7387 0.625531C11.8253 0.709011 11.8944 0.809043 11.9417 0.919699C11.989 1.03036 12.0137 1.14939 12.0141 1.26974C12.0146 1.39008 11.9909 1.5093 11.9445 1.62033C11.898 1.73136 11.8298 1.83194 11.7438 1.9161L6.6479 7.31172C6.56401 7.39875 6.46344 7.46798 6.35219 7.51526C6.24094 7.56254 6.1213 7.58692 6.00042 7.58692C5.87954 7.58692 5.75991 7.56254 5.64866 7.51526C5.53741 7.46798 5.43684 7.39875 5.35295 7.31172L0.25709 1.9161C0.0918282 1.74433 0.00152299 1.51397 0.0060196 1.27565C0.0105162 1.03733 0.109447 0.810546 0.281071 0.645131Z" fill="black" />
                        </svg>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Template;
