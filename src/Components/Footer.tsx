import { useNavigate } from "react-router-dom"

export const Footer = () => {

  const navigate = useNavigate();
  const handleAboutNavigate = ()=>{
    navigate("/About")
  }


    return(<div className='min-w-screen'>
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
        <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
        
        <footer className="relative bg-slate-100 pt-8 pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap text-left lg:text-left">
              <div className="w-full lg:w-6/12 px-4">
                <h4 className="text-3xl font-semibold text-black">Let's keep in touch!</h4>
                <h5 className="text-xl mt-0 mb-2 text-gray-700">
                  Find us on any of these platforms, we respond 1-2 business days.
                </h5>
                <div className="mt-6 lg:mb-0 mb-6">
                  <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" onClick={() => window.open('https://github.com/Sanil2002','_blank')}>
                    <i className="fab fa-twitter"></i></button><button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" onClick={() => window.open('https://github.com/Sanil2002','_blank')}>
                    <i className="fab fa-facebook-square"></i></button><button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" onClick={() => window.open('https://github.com/Sanil2002','_blank')}>
                    <i className="fab fa-dribbble"></i></button><button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button" onClick={() => window.open('https://github.com/Sanil2002','_blank')}>
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="flex flex-wrap items-top mb-6">
                  <div className="w-full lg:w-4/12 px-4 ml-auto">
                    <span className="block uppercase text-black text-xl font-semibold mb-2">Useful Links</span>
                    <ul className="list-unstyled">
                      <li>
                        <a className="text-gray-700 hover:text-gray-800 font-semibold block pb-2 text-lg" onClick={handleAboutNavigate}>About Us</a>
                      </li>
                      <li>
                        <a className="text-gray-700 hover:text-gray-800 font-semibold block pb-2 text-lg" onClick={handleAboutNavigate}>Blog</a>
                      </li>
                      <li>
                        <a className="text-gray-700 hover:text-gray-800 font-semibold block pb-2 text-lg" href='https://github.com/Sanil2002'>Github</a>
                      </li>
                      <li>
                        <a className="text-gray-700 hover:text-gray-800 font-semibold block pb-2 text-lg">Free Products</a>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <span className="block uppercase text-black text-xl font-semibold mb-2">Other Resources</span>
                    <ul className="list-unstyled">
                      <li>
                        <a className="text-gray-700 hover:hover:text-gray-800 font-semibold block pb-2 text-lg">MIT License</a>
                      </li>
                      <li>
                        <a className="text-gray-700 hover:hover:text-gray-800 font-semibold block pb-2 text-lg" onClick={handleAboutNavigate}>Terms &amp; Conditions</a>
                      </li>
                      <li>
                        <a className="text-gray-700 hover:hover:text-gray-800 font-semibold block pb-2 text-lg" onClick={handleAboutNavigate}>Privacy Policy</a>
                      </li>
                      <li>
                        <a className="text-gray-700 hover:hover:text-gray-800 font-semibold block pb-2 text-lg">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-6 border-blueGray-300" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Copyright © <span id="get-current-year">2024</span><a className="text-blueGray-500 hover:text-gray-800" target="_blank"> Y-Mart by</a>
                  <a className="text-blueGray-500 hover:text-blueGray-800"> Sanil</a>.
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
        )
}