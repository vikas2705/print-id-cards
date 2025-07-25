import React from "react";

const RsideArticle = () => {
    const steps = [
        {
            number: 1,
            title: "Choose Template",
            description: "Select a predefined ID card template from the server",
        },
        {
            number: 2,
            title: "Preview Template",
            description: "See a visual preview of the selected ID card layout",
        },
        {
            number: 3,
            title: "Upload Data",
            description: "Upload Excel sheet with student data and a zipped folder of photos",
        },
        {
            number: 4,
            title: "View Generated Cards",
            description: "Cards are generated based on selected template and uploaded data.",
        },
        {
            number: 5,
            title: "Select & Print",
            description: "Search, select, and mark the ID cards you want to print.",
        }
    ];

    return (
        <div className="bg-gray-100 flex items-center justify-center w-full h-full">
            <div
                className="w-full h-full overflow-y-auto rounded-2xl px-4 py-4 shadow-xl"
                style={{ backgroundColor: 'rgba(59, 62, 145, 1)' }}
            >
                <div className="relative space-y-2.5 mt-4 flex-col p-5">
                    {/* Vertical connecting line */}
                    <div
                        className="absolute left-[37px] top-8  bottom-4 w-0.5 -translate-x-0.5"
                        style={{ backgroundColor: '#BBA170' }}
                    ></div>
                    {steps.map((step) => (
                        <div key={step.number} className="flex items-start gap-4 relative">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: 'rgba(187, 161, 112, 1)' }}>
                                <span className="text-[#FFFFFF] font-bold text-base">
                                    {step.number}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-[16px] leading-tight">
                                    {step.title}
                                </h3>
                                <p
                                    className="text-[12px]"
                                    style={{
                                        color: 'rgba(136, 136, 136, 1)',
                                        lineHeight: '16px',
                                    }}
                                >
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RsideArticle;
