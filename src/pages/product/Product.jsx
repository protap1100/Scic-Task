import { useEffect, useState } from "react";
import SectionTitle from "../../components/shared/SectionTitle";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SectionTitle heading={"All Books"} subHeading={"Here Is All Books"} />

      {/* Search Input */}
      <div className="flex justify-between gap-5 mt-5 w-full lg:w-1/4 mx-auto">
        <input
          type="text"
          placeholder="Search meals..."
          className="border border-gray-300 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button className="px-2 py-1 bg-orange-500 rounded-xl hover:bg-orange-600 text-white transition duration-700 outline-none">
          Search
        </button>
      </div>

      {/* Sorting Dropdown */}
      <div className="mt-5 flex justify-center">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="border border-gray-300 p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="filter">Filter</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center space-x-4 mt-8">
        <button className="px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none">
          All
        </button>
        <button className="px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none">
          Bangladesh History
        </button>
        <button className="px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none">
          Liberation War
        </button>
        <button className="px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none">
          Culture and Heritage
        </button>
        <button className="px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none">
          Political History
        </button>
        <button className="px-2 py-1 bg-orange-500 rounded hover:bg-orange-600 text-white transition duration-700 outline-none">
          Economic History
        </button>
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
                {pro.name}
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
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
          Previous
        </button>

        {/* Numbered Page Links */}
        <div className="flex space-x-2">
          <button className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
            1
          </button>
          <button className="px-3 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition">
            2
          </button>
          <button className="px-3 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition">
            3
          </button>
          <button className="px-3 py-2 rounded-lg bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100 transition">
            4
          </button>
          {/* Add more buttons as needed */}
        </div>

        <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
