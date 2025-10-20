import React from "react";
import { CgDesktop } from "react-icons/cg";
import { FaUikit } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import { SiKalilinux } from "react-icons/si";
import { SiOpenai } from "react-icons/si";
import { SiGoogledataproc } from "react-icons/si";
import { DiGoogleAnalytics } from "react-icons/di";
import { SiOpenaigym } from "react-icons/si";

function SmallCourses() {
  return (
    <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center">
          <CgDesktop className="h-[60px] w-[60px]" />
        </div>
        Web Dev
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#d0f4ed] rounded-lg flex items-center justify-center">
          <FaUikit className="h-[60px] w-[60px]" />
        </div>
        UI/UX Design
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#ceedb1] rounded-lg flex items-center justify-center">
          <MdAppShortcut className="h-[60px] w-[60px]" />
        </div>
        App Dev
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#92c0fb] rounded-lg flex items-center justify-center">
          <SiKalilinux className="h-[60px] w-[60px]" />
        </div>
        Ethical Hacking
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#f48d8d] rounded-lg flex items-center justify-center">
          <SiOpenai className="h-[60px] w-[60px]" />
        </div>
        AI/ML
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#fffba8] rounded-lg flex items-center justify-center">
          <SiGoogledataproc className="h-[60px] w-[60px]" />
        </div>
        Data Science
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#cdbaff] rounded-lg flex items-center justify-center">
          <DiGoogleAnalytics className="h-[60px] w-[60px]" />
        </div>
        Data Analytics
      </div>

      <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
        <div className="w-[100px] h-[90px] bg-[#ffd499] rounded-lg flex items-center justify-center">
          <SiOpenaigym className="h-[60px] w-[60px]" />
        </div>
        AI Tools
      </div>
    </div>
  );
}

export default SmallCourses;
