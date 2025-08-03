import React from "react";
import "./App.css";
import IdCardList from "./components/IdCardList";
import Template from "./components/template";
import Logo from "./assets/Logo.svg";
import FooterSection from "./components/footer";
import RsideArticle from "./components/rsideArticle";

function App() {
  return (
    <div className="px-20 py-10 bg-white min-h-screen space-y-8">
      <header className="flex items-center justify-between bg-[linear-gradient(to_bottom,#8666E8,#132963)] py-5 px-8 rounded-lg">
        <img src={Logo} alt="logo" width={120} height={120} />
        <div className="flex flex-col items-center gap-2 text-white">
          <div className="text-xl font-bold uppercase">ID Card Generator</div>
          <div className="flex flex-col items-center text-xs">
            <div>In association with</div>
            <div className="font-bold">Shri Lal Bahadur Shastri National Sanskrit University</div>
          </div>
        </div>
        <div className="text-white text-sm mr-2">Powered by Synthlane</div>
      </header>
      <main className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-between">
          <div className="w-[75%]">

            <Template />

          </div>
          <div className="w-[22%] bg-white rounded-lg h-[422px]">
            <RsideArticle/>
          </div>
        </div>
        <IdCardList />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
