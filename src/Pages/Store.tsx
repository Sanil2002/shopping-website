import React, { useState, useEffect } from "react";
import Product from "./Products"
import { getAllProducts, initDB } from "../Utilities/db";
import { Loading } from "../Utilities/Loading";
import { Carousel } from "../Utilities/Caraousel";

interface StoreItem {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const Store: React.FC = () => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [sort, setSort] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>('');
  const [filteredData, setFilteredData] = useState<StoreItem[]>([]);
  const [search, setSearch] = useState<string>("")

  
  useEffect(() => {
    const fetchProducts = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      setStoreItems(productsFromDB);
      setFilteredData(productsFromDB);
    };

    fetchProducts();
  }, []);


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortSelected: string = e.target.value;
    setSort(sortSelected);
  }


  const handleFilteredChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setProductCategory(selectedCategory);
    console.log(storeItems);
    
    console.log(selectedCategory);


    
    if(selectedCategory==="all"){
      setFilteredData(storeItems)
    }else{ 
      setFilteredData(storeItems.filter(item => item.category === selectedCategory));
    }
  }



  return (
    <div>
      <Loading />
      {/* <div className="relative gap-5 flex justify-center my-6">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="text-xl w-full max-w-lg pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
          placeholder="Search..."
        />
      </div> */}
      <div className="flex  justify-center min-w-full">
      <div className="mx-2 min-w-[80%] md:min-w-[50%] my-10 rounded-xl bg-white px-4 py-3">
        <div className="mb-2 flex">
          <div className="mr-1 w-full">
            <input type="text" className="placeholder:text-gray-400 text-2xl h-12 w-full rounded-md bg-gray-100 px-4 font-medium focus:outline-none focus:ring-1 focus:ring-blue-200 shadow-sm" placeholder="Search for products" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <button className="shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
          </button>
        </div>
        <div className="space-x-3">
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("Casual")} ><span className="mr-1 text-gray-300">#</span>Casuals</button>
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("Cotton")}><span className="mr-1 text-gray-300">#</span>Cotton</button>
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("white gold")}><span className="mr-1 text-gray-300">#</span>White-gold</button>
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("bracelet")}><span className="mr-1 text-gray-300">#</span>Bracelets</button>
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("Hard drive")}><span className="mr-1 text-gray-300">#</span>Hard-drive</button>
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("Samsung")}><span className="mr-1 text-gray-300">#</span>Samsung</button> 
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("75Hz")}><span className="mr-1 text-gray-300">#</span>75-Hertz</button>  
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("leather")}><span className="mr-1 text-gray-300">#</span>Leather</button>         
          <button className="text-2xl font-medium text-gray-400 hover:text-black" onClick={()=>setSearch("HDMI")}><span className="mr-1 text-gray-300">#</span>HDMI</button>  
        </div>
      </div>
      </div>

      <div>
      <div className="text-center">
      <h1 className="p-4 justify-center bg-gradient-to-r from-black via-yellow-400 to-black bg-clip-text text-5xl font-extrabold text-transparent sm:text-5xl">Y Mart: The Amazing Shopping Experience</h1>
      </div>
        <div className="flex justify-center mb-4 gap-x-4">
          <div className="md:w-1/3 xl:w-1/4">
            <select onChange={handleSortChange} className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-xl">
              <option value="random">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <div className=" md:w-1/3 xl:w-1/4">
            <select value={productCategory} onChange={handleFilteredChange} className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 text-xl">
              <option value="all">All Category</option>
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Women</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center">
        <Carousel />
        <div className="flex flex-wrap gap-12 px-3 justify-center">
          {filteredData.filter(item => {
            return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
          }).sort((a, b) => {
            if (sort === 'asc') {
              return a.price - b.price;
            } else if (sort === 'desc') {
              return b.price - a.price;
            } else {
              return 0;
            }
          }).map((datas: StoreItem) => {
            return (
              <Product key={datas.id} datas={datas} />
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Store;




