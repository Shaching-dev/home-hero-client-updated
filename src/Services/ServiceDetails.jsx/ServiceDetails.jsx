import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Container from "../../components/Container/Container";
import ServiceDetailsSkeleton from "../../Skeleton/ServiceDetailsSkeleton";
import useAuth from "../../hooks/useAuth/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const modalRef = useRef();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showSkeleton, setShowSkeleton] = useState(true);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading service details..." />;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Failed to load service details. Please try again.
      </div>
    );
  }

  const handleServiceBook = () => {
    modalRef.current.showModal();
  };
  const handleBookSubmit = (formData) => {
    const bookingData = {
      customerName: formData.name,
      customerEmail: user.email,
      customerPhone: formData.phone,
      serviceId: service._id,
      serviceName: service.serviceName,
      serviceImage: service.imageUrl,
      providerName: service.providerName,
      providerEmail: service.email,
      offeredPrice: formData.price,
      details: formData.details,
      status: "pending",
      bookedAt: new Date(),
    };

    axiosSecure.post("/bookings", bookingData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Successfully Booked!",
          icon: "success",
        });

        modalRef.current.close();
        reset();
      }
    });
  };

  return (
    <div className=" py-10 min-h-screen">
      <Container>
        {/* Changed max-w-md to max-w-3xl for a better balance */}
        {showSkeleton ? (
          <div className="grid grid-cols-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <ServiceDetailsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto  rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Takes 40% width on desktop */}
              <div className="w-full md:w-2/5 h-64 md:h-auto">
                <img
                  src={service.imageUrl}
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section - Takes 60% width on desktop */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                      {service.category}
                    </span>
                    <div className="text-2xl font-bold text-primary">
                      ${service.price}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold  mb-3">
                    {service.serviceName}
                  </h2>

                  <p className=" leading-relaxed text-sm md:text-base mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center text-sm">
                      <span className=" w-20">Provider:</span>
                      <span className="font-semibold ">
                        {service.providerName}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className=" w-20">Email:</span>
                      <span className="font-semibold ">{service.email}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <button
                    onClick={handleServiceBook}
                    className="btn btn-primary w-full md:w-auto px-12 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-3xl mx-auto mt-12 text-center text-gray-400 text-sm">
          More details or reviews could go here...
        </div>
      </Container>

      <div>
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">
              Fill Your Details to Book
            </h3>
            <div>
              <form
                onSubmit={handleSubmit(handleBookSubmit)}
                className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {errors.name?.type === "required" && (
                    <p className="text-red-600">Name is Required</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    defaultValue={user?.email}
                    readOnly
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", { required: true })}
                    type="tel"
                    placeholder="+880182...."
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {errors.phone?.type === "required" && (
                    <p className="text-red-600">Phone number is Required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Your starting price
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="text"
                    placeholder="price"
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {errors.price?.type === "required" && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Notes
                  </label>
                  <textarea
                    {...register("details", { required: true })}
                    placeholder="Any specific requirements..."
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}></textarea>
                  {errors.details?.type === "required" && (
                    <p className="text-red-600">This field is required</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
                  Confirm Booking
                </button>
              </form>
            </div>
            <div className="">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn w-full my-5 text-white font-semibold bg-red-500">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ServiceDetails;
