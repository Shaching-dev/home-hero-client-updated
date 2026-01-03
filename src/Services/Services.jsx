import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import Container from "../components/Container/Container";
import ServiceSkeleton from "../Skeleton/ServiceSkeleton";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data = {},
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "services",
      debouncedSearch,
      sort,
      currentPage,
      selectedCategory,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/services?searchText=${debouncedSearch}&sort=${sort}&page=${currentPage}&limit=${itemsPerPage}&category=${selectedCategory}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const services = data.services || [];
  // console.log(services);

  const total = data.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-red-500 text-center">{error.message}</p>;
  }

  return (
    <div>
      <Container>
        <section className="my-10 ">
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-10">
              <h3 className="text-3xl font-bold">Our Services</h3>

              {/* Search */}
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search services..."
                  className="w-[400px]"
                />
              </label>

              {/* Sort */}
              <select
                className="select select-bordered"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}>
                <option disabled>Sort By</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <ServiceSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              {isFetching && (
                <div className="text-center my-3">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 min-h-screen">
                {/* Categories - Left */}
                <div className="md:col-span-2">
                  <div className="p-4 bg-base-100">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Select a Category
                    </h2>
                    <div className="text-center">
                      {[
                        "Plumber",
                        "Electrician",
                        "Cleaner",
                        "Design",
                        "Gardening",
                        "Painting",
                      ].map((category) => (
                        <label
                          key={category}
                          className="inline-block m-2 cursor-pointer select-none transition-transform duration-300 hover:scale-105">
                          <input
                            type="checkbox"
                            name="category"
                            className="checkbox checkbox-xs hidden peer"
                            checked={selectedCategory === category}
                            onChange={() =>
                              setSelectedCategory(
                                selectedCategory === category ? "" : category
                              )
                            }
                          />
                          <div className="peer-checked:bg-primary peer-checked:text-white border border-base-300 rounded-xl px-5 py-3 shadow-md hover:shadow-xl transition-all">
                            {category}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services - Right */}
                <div className="md:col-span-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {services.map((service) => (
                      <div
                        key={service._id}
                        className="rounded-xl border p-3 flex flex-col h-full">
                        <img
                          src={service.imageUrl}
                          alt={service.serviceName}
                          className="h-30 w-full object-cover rounded-lg"
                        />

                        <div className="flex flex-col flex-grow justify-center items-center text-center">
                          <h4 className="font-semibold mt-2">
                            {service.serviceName}
                          </h4>
                          <p className="text-primary font-bold">
                            ${service.price}
                          </p>
                        </div>

                        <Link
                          className="w-full btn btn-sm btn-primary mt-auto"
                          to={`/services/${service._id}`}>
                          See Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <div className="flex justify-center gap-2 my-10">
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}>
                Prev
              </button>

              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`btn btn-sm ${
                    currentPage === page + 1 ? "btn-primary" : ""
                  }`}>
                  {page + 1}
                </button>
              ))}

              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Services;
