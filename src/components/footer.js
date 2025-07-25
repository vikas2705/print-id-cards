import React, { useRef, useState } from "react";

const FooterSection = () => {
    return (
        <div className="bg-footer-content w-[1440px] h-[200px] rounded-lgs p-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left side - Logo and description */}
                <div className="space-y-6 lg:space-y-10">
                    <div className="flex items-center space-x-3">
                        <img src="/SynthlaneLogo.png" alt="Synthlane Logo" className="h-12 w-auto" />
                    </div>

                    <p className="text-[#132963] text-footer-text leading-relaxed text-sm lg:text-base max-w-[270px]">
                        Synthlane is a consulting company which offers sophisticated end-to-end AI enabled technical solutions for  public and private sector needs.
                    </p>

                    <p className="text-footer-text text-xs lg:text-sm text-[#E5E7EBs]">
                        © 2025 Synthlane. All rights reserved.
                    </p>
                </div>

                {/* Right side - Contact information */}
                <div className="ml-[100px] space-y-6 lg:space-y-8 w-[500px] h-[286px]">
                    <h3 className="text-lg lg:text-xl font-semibold text-footer-title">Contact Information</h3>

                    <div className="space-y-6">
                        <div className="flex flex-row justify-between gap-x-8"> {/* Flex row for phone and email support */}
                            <div>
                                <h4 className="text-footer-text text-lg font-medium mb-3 text-[#737373]">Phone Support</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 gap-3">
                                        <div className="w-4 h-4 bg-footer-text rounded flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                <path d="M20.8882 20.5435H0.471191V0.126465H20.8882V20.5435Z" stroke="#E5E7EB" />
                                                <g clip-path="url(#clip0_159_3415)">
                                                    <path d="M7.04789 1.10736C6.74084 0.36565 5.93134 -0.0291331 5.15772 0.182215L1.64854 1.13926C0.95468 1.33067 0.472168 1.96073 0.472168 2.67852C0.472168 12.5441 8.47151 20.5434 18.3371 20.5434C19.0549 20.5434 19.6849 20.0609 19.8763 19.3671L20.8334 15.8579C21.0447 15.0843 20.65 14.2748 19.9082 13.9677L16.08 12.3726C15.4301 12.1015 14.6764 12.2889 14.2337 12.8352L12.6227 14.8011C9.81536 13.4732 7.54237 11.2002 6.21446 8.3929L8.1804 6.78586C8.72672 6.33923 8.91414 5.58954 8.64298 4.93955L7.04789 1.11135V1.10736Z" fill="#525252" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_159_3415">
                                                        <path d="M0.472168 0.126465H20.8892V20.5435H0.472168V0.126465Z" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <span className="text-footer-title font-medium text-sm lg:text-base underline">+91 7739 748868</span>
                                    </div>
                                    <div className="flex items-center space-x-3 gap-3">
                                        <div className="w-4 h-4 bg-footer-text rounded flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                <path d="M20.8882 20.5435H0.471191V0.126465H20.8882V20.5435Z" stroke="#E5E7EB" />
                                                <g clip-path="url(#clip0_159_3415)">
                                                    <path d="M7.04789 1.10736C6.74084 0.36565 5.93134 -0.0291331 5.15772 0.182215L1.64854 1.13926C0.95468 1.33067 0.472168 1.96073 0.472168 2.67852C0.472168 12.5441 8.47151 20.5434 18.3371 20.5434C19.0549 20.5434 19.6849 20.0609 19.8763 19.3671L20.8334 15.8579C21.0447 15.0843 20.65 14.2748 19.9082 13.9677L16.08 12.3726C15.4301 12.1015 14.6764 12.2889 14.2337 12.8352L12.6227 14.8011C9.81536 13.4732 7.54237 11.2002 6.21446 8.3929L8.1804 6.78586C8.72672 6.33923 8.91414 5.58954 8.64298 4.93955L7.04789 1.11135V1.10736Z" fill="#525252" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_159_3415">
                                                        <path d="M0.472168 0.126465H20.8892V20.5435H0.472168V0.126465Z" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <span className="text-footer-title font-medium text-sm lg:text-base underline">+91 9310 430131</span>
                                    </div>
                                    <div className="flex items-center space-x-3 gap-3">
                                        <div className="w-4 h-4 bg-footer-text rounded flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                                <path d="M20.8882 20.5435H0.471191V0.126465H20.8882V20.5435Z" stroke="#E5E7EB" />
                                                <g clip-path="url(#clip0_159_3415)">
                                                    <path d="M7.04789 1.10736C6.74084 0.36565 5.93134 -0.0291331 5.15772 0.182215L1.64854 1.13926C0.95468 1.33067 0.472168 1.96073 0.472168 2.67852C0.472168 12.5441 8.47151 20.5434 18.3371 20.5434C19.0549 20.5434 19.6849 20.0609 19.8763 19.3671L20.8334 15.8579C21.0447 15.0843 20.65 14.2748 19.9082 13.9677L16.08 12.3726C15.4301 12.1015 14.6764 12.2889 14.2337 12.8352L12.6227 14.8011C9.81536 13.4732 7.54237 11.2002 6.21446 8.3929L8.1804 6.78586C8.72672 6.33923 8.91414 5.58954 8.64298 4.93955L7.04789 1.11135V1.10736Z" fill="#525252" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_159_3415">
                                                        <path d="M0.472168 0.126465H20.8892V20.5435H0.472168V0.126465Z" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <span className="text-footer-title font-medium text-sm lg:text-base underline">+91 9212 125932</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 ml-8">
                                <div className="w-6 h-5 bg-footer-text rounded flex-shrink-0 flex items-center justify-center mt-0.5">
                                    <div className="w-3 h-2 bg-white rounded-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                            <g clip-path="url(#clip0_159_3404)">
                                                <path d="M2.25663 3.31396C1.19989 3.31396 0.342529 4.17132 0.342529 5.22806C0.342529 5.83021 0.625656 6.39646 1.10817 6.75934L9.78542 13.2673C10.24 13.6062 10.8621 13.6062 11.3167 13.2673L19.9939 6.75934C20.4765 6.39646 20.7596 5.83021 20.7596 5.22806C20.7596 4.17132 19.9022 3.31396 18.8455 3.31396H2.25663ZM0.342529 7.7802V16.0746C0.342529 17.4823 1.487 18.6268 2.89466 18.6268H18.2074C19.6151 18.6268 20.7596 17.4823 20.7596 16.0746V7.7802L12.0823 14.2881C11.1731 14.97 9.92897 14.97 9.01978 14.2881L0.342529 7.7802Z" fill="#525252" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_159_3404">
                                                    <path d="M0.342041 0.762451H20.7591V21.1795H0.342041V0.762451Z" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-footer-text text-lg font-medium mb-3 text-[#737373]">Email Support</div>
                                    <div className="text-footer-title font-medium text-sm lg:text-base text-[#171717]">support@synthlane.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
