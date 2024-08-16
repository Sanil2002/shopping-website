import React from "react";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  datas: {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
  };
}

const Product: React.FC<ProductProps> = ({ datas }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/Store/${datas.id}`);
  };

  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl">
      <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
        <img className=" w-full h-full" src={datas.image} alt={datas.title} />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </a>
      <div className="flex-1 mt-4 px-5 pb-16">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">{datas.title}</h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">${datas.price}</span>
            <span className="text-sm text-slate-900 line-through">$699</span>
          </p>
        </div>
        <div className="mt-auto px-5 pb-5">
        <button
          onClick={handleView}
          className="flex group justify-center mt-auto absolute bottom-4 w-1/2 transform rounded-md bg-yellow-300 px-5 py-2.5 text-center text-sm font-medium text-black focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <span className="font-extrabold text-lg">View</span>
          <svg
                    className="flex-0 group-hover:w-6 ml-4 w-0 transition-all"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
