import { useNavigate } from "react-router-dom"

export const Commentbutton = () => {

    const navigate = useNavigate();

    const handleNavigateToComments = () => {
        navigate('/Comments');
    }

    return(
        <button className="bold p-3 justify-end text-white animate-bounce" onClick={handleNavigateToComments}>
        <div className=" flex flex-col justify-center items-center ">
                <div className=" text-black bg-white border border-black p-8 rounded-full w-[70%]">
                Drop us a Comment...
                </div>
              {/* <div className="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-purple-500"></div> */}
              <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-36 w-36" />
              </div></button>
)}