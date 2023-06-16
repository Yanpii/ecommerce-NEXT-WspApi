import FormCon from "@/components/forms/FormCon";
import FormNam from "@/components/forms/FormNam";
import FormTel from "@/components/forms/FormTel";
import NavbarAdmin from "@/components/navbar/NavbarAdmin";

import React from "react";

const TabComponent = () => (

   <div>
    <NavbarAdmin />
  <div className="w-3/5 p-8 mx-auto">
    <div className="mb-8 flex flex-col items-center">
      <img
        src="https://i.pinimg.com/564x/b4/d3/be/b4d3bee357246896cd509e9352e94f10.jpg"
        width="150"
        alt="logo"
        className=" bg-cover bg-center rounded-full"
      />
    </div>
    <section className="shadow row">
      <div className="tabs">
        <div className="border-b border-[#6eec7a] tab">
          <div className="border-l-2 border-transparent relative">
            <input
              className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
              type="checkbox"
              id="chck1"
            />
            <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label">
              <span className="text-white font-medium  text-xl">
                Editar nombre de usuario
              </span>
            </header>
            <div className="tab-content">
              <div className="pl-8 pr-8 pb-5 text-white">
                <FormNam />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#6eec7a] tab">
          <div className="border-l-2 border-transparent relative">
            <input
              className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
              type="checkbox"
              id="chck1"
            />
            <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label">
              <span className="text-white font-medium  text-xl">
                Editar contraseña
              </span>
            </header>
            <div className="tab-content">
              <div className="pl-8 pr-8 pb-5 text-white">
              <FormCon/>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#6eec7a] tab">
          <div className="border-l-2 border-transparent relative">
            <input
              className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
              type="checkbox"
              id="chck1"
            />
            <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label">
              <span className="text-white font-medium  text-xl">
                Editar número de teléfono
              </span>
            </header>
            <div className="tab-content">
              <div className="pl-8 pr-8 pb-5 text-white">
               <FormTel/>
              </div>
            </div>
          </div>
        </div>


      </div>
      
    </section>
    <style jsx>{`
      .tab {
        overflow: hidden;
      }
      .tab-content {
        max-height: 0;
        transition: all 0.5s;
      }
      input:checked + .tab-label .test {
        background-color: #000;
      }
      input:checked + .tab-label .test svg {
        transform: rotate(180deg);
        stroke: #fff;
      }
      input:checked + .tab-label::after {
        transform: rotate(90deg);
      }
      input:checked ~ .tab-content {
        max-height: 100vh;
      }
    `}</style>
  </div>
  </div>
);

export default TabComponent;
