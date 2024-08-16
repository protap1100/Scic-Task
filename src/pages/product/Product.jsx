import { useEffect, useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(
      `http://localhost:5000/books?page=${currentPage}&limit=10&search=${searchTerm}&categoryName=${category}&sort=${sortOrder}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.books);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [currentPage, searchTerm, category, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to page 1 on category change
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SectionTitle heading={"All Books"} subHeading={"Here Is All Books"} />

      <div className="flex justify-between gap-5 mt-5 w-full lg:w-1/4 mx-auto">
        <input
          type="text"
          placeholder="Search meals..."
          className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="px-2 py-1 bg-orange-500 rounded-xl hover:bg-orange-600 text-white transition duration-700 outline-none">
          Search
        </button>
      </div>

      <div className="mt-5 flex justify-center">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="all">All</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        {[
          "All",
          "Bangladesh History",
          "Liberation War",
          "Culture and Heritage",
          "Political History",
          "Economic History",
        ].map((cat) => (
          <button
            key={cat}
            className={`px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none ${
              category === cat ? "bg-orange-600" : ""
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {products.map((pro) => (
          <div
            key={pro._id}
            className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              className="w-full h-64 object-cover"
              src={pro.image}
              alt={pro.name}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {pro.title}
              </h3>
              <p className="text-gray-500 mt-2">${pro.price}</p>
              <button className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              className={`px-3 py-2 rounded-lg ${
                currentPage === num + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100"
              } transition`}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>

        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
