import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getAllProducts, initDB } from "../Utilities/db";
import { useNavigate } from "react-router-dom";

interface DataRow {
    id: number;
    title: string;
    category: string;
    price: number;
  }
  

function Table() {

  const[storeItems, setStoreItems] = useState([])
  const columns = [
    {
      name: 'id',                                            //column for the product ID, which is sortable.
      selector: (row: DataRow) => row.id,                    //The selector specifies how to acces the id in a row
      sortable: true,
    },
    {
        name: 'Title',                                       //column for the product title.
        selector: (row: DataRow) => row.title,
        sortable: true,
    },
    {
      name: 'Category',                                      //column for the product category.
      selector: (row: DataRow) => row.category,
      sortable: true,
    },
    {
      name: 'Price',                                         //column for the product price.
      selector: (row: DataRow) => row.price,
      sortable: true,
    },
  ];

  useEffect(() => {                                          //Fetching products from IndexedDB
    const fetchProducts = async () => {
      const db = await initDB();
      const productsFromDB = await getAllProducts(db);
      setStoreItems(productsFromDB);
     
    };

    fetchProducts();
  }, []);                                                   //runs only after initial rendering.


  const navigate = useNavigate();                          //Navigation to singleproduct page when a product row is clicked.
  const handleRowNavigate = (row: DataRow) => {
    navigate(`/Store/${row.id}`);
  }


  return (
    <div className="container mt-5 overflow-auto">
      <DataTable pointerOnHover={true}
        columns={columns}
        data={storeItems}
        pagination={true} 
        onRowClicked={handleRowNavigate}
        customStyles={{
          headRow: {
            style: {
              borderColor: '#fcd34d',
              fontWeight: 'bolder',
              fontSize: 'small',
            },
          },
          rows: {
            style: {
              borderColor: '#6082B6',
            },
          },
        }} 
      />
    </div>
  );
}

export default Table;
