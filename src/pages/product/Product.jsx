import { useEffect, useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import Loading from "../others/Loading";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  useEffect(() => {
    fetch(
      `https://scic-server-five.vercel.app/books?page=${currentPage}&limit=9&search=${searchTerm}&categoryName=${category}&publisher=${brand}&sort=${sortOrder}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.books);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [currentPage, searchTerm, category, sortOrder, minPrice, maxPrice, brand]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceRangeChange = () => {
    const min = document.getElementById("minPrice").value || 0;
    const max = document.getElementById("maxPrice").value || Infinity;
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleBrandName = (brandName) => {
    setBrand(brandName);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SectionTitle heading={"All Books"} subHeading={"Here Is All Books"} />

      {/* Search Bar and Search Button */}
      <div className="flex lg:flex-row flex-col justify-between gap-5 mt-5 w-full lg:w-1/3 mx-auto ">
        <input
          type="text"
          placeholder="Search books..."
          className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-md transition duration-700 outline-none">
          Search
        </button>
      </div>

      {/* Price Filter Inputs */}
      <div className="my-5 w-1/3 mx-auto  flex lg:flex-row flex-col gap-5">
        <input
          type="number"
          name="minPrice"
          id="minPrice"
          placeholder="Min Price"
          className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm"
        />
        <input
          type="number"
          name="maxPrice"
          id="maxPrice"
          placeholder="Max Price"
          className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm"
        />
        <button
          onClick={handlePriceRangeChange}
          className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 text-white font-semibold shadow-md transition duration-700 outline-none"
        >
          Apply
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="mt-8 flex justify-center">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
        >
          <option value="dateAsc">Date:Newest First</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-col lg:flex-row gap-3 justify-center mt-8 items-center">
        <h1 className="text-orange-600 text-xl:">Category Name</h1>
        <select
          value={category} // Bind the selected value to your state
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded text-white font-semibold shadow-md transition duration-700 outline-none"
        >
          {[
            "All",
            "Bangladesh History",
            "Liberation War",
            "Culture and Heritage",
            "Political History",
            "Economic History",
          ].map((cat) => (
            <option key={cat} value={cat} className="bg-orange-500">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Publisher Name */}
      <div className="flex flex-col lg:flex-row gap-3 justify-center mt-8 items-center">
        <h1 className="text-orange-600 text-xl:">Brand Name</h1>
        <select
          value={brand}
          onChange={(e) => handleBrandName(e.target.value)}
          className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded text-white font-semibold shadow-md transition duration-700 outline-none"
        >
          {[
            "All",
            "Environment Press",
            "Bengal Press",
            "Dhaka Publications",
            "Subcontinental Press",
          ].map((cat) => (
            <option key={cat} value={cat} className="bg-orange-500">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {products.map((pro) => (
          <div
            key={pro._id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 bg-white"
          >
            <img className="w-full p-5 h-80 " src={pro.image} alt={pro.title} />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">
                {pro.title}
              </h3>
              <h1>{pro.writerName}</h1>
              <h1>{pro.publisher}</h1>
              <p className="text-gray-500 mt-3">Price: ${pro.price}</p>
              <div className="flex gap-4 ">
                Available:
                {pro.availability.map((aval, index) => (
                  <h1
                    className={`${
                      aval === "Online" ? "text-green-500" : "text-red-600"
                    }  `}
                    key={index}
                  >
                    {aval}
                  </h1>
                ))}
              </div>
              <div className="flex gap-4 ">
                Format:
                {pro.format.map((aval, index) => (
                  <h1 className="text-red-500" key={index}>
                    {aval}
                  </h1>
                ))}
              </div>
              <h1>Added On: {pro.added_on}</h1>
              <div className="flex justify-between">
                <button className="mt-5 bg-orange-500 text-white py-2 px-5 rounded hover:bg-orange-600 transition shadow-lg">
                  View Details
                </button>
                <button className="mt-5 bg-orange-500 text-white py-2 px-5 rounded hover:bg-orange-600 transition shadow-lg">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-12">
        <button
          className=" px-3 py-2 lg:px-5 lg:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Numbered Page Links */}
        <div className="flex space-x-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              className={`lg:px-4 p-2 lg:py-2 rounded-lg text-white font-semibold shadow-md ${
                currentPage === num + 1
                  ? "bg-orange-600"
                  : "bg-gray-200 text-indigo-600 hover:bg-indigo-100"
              } transition`}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>

        <button
          className="px-3 py-2 lg:px-5 lg:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
