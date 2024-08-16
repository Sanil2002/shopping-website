import { useState, useEffect } from 'react';
import { getAllProducts, initDB } from '../Utilities/db';
import { useNavigate } from 'react-router-dom';

export function Carousel() {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      if (productsFromDB) {
        const jewelleryProducts = productsFromDB.filter((item: { category: string }) => item.category === 'jewelery');
        setSlides(jewelleryProducts); // Set filtered jewellery products as slides
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);                                    // Cleanup interval on component unmount
  }, [slides.length]);



  const handleNavigatetoProduct = (productId: number) => {
    navigate(`/Store/${productId}`);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className='flex flex-row items-center gap-96'>
      <button
        className="group top-1/2 left-0 transform -translate-y-1/2 p-3 text-slate-700 hover:bg-opacity-75 focus:outline-none"
        onClick={goToPrevSlide}
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
        </svg>
      </button>
      <div className="relative m-10 w-[400px] sm:w-[600px] md:w-[900px] mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-xl md:pl-8">
        <div className="flex flex-row overflow-hidden bg-white sm:flex-row md:h-80">
          <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
            {slides[currentSlide] && (
              <>
                <h2 className="text-5xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
                  {slides[currentSlide].title}
                </h2>
                <p className="mt-2 text-2xl">{slides[currentSlide].category}</p>
                <button
                  className="group mt-auto flex w-48 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                  onClick={() => handleNavigatetoProduct(slides[currentSlide].id)}
                >
                  <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                    Shop now
                  </span>
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
              </>
            )}
          </div>

          <div className="ml-auto h-48 w-1/2 bg-white sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
            {slides[currentSlide] && (
              <img className="h-full w-full p-3" src={slides[currentSlide].image} alt="Slide image" />
            )}
          </div>
        </div>
      </div>
      <button
        className="group top-1/2 right-0 transform -translate-y-1/2 p-3 text-slate-700 hover:bg-opacity-75 focus:outline-none"
        onClick={goToNextSlide}
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
        </svg>
      </button>
    </div>
  );
}
