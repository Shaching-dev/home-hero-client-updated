import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import Container from "../../components/Container/Container";

const CreateServices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const photoFile = watch("serviceImage");

  // Preview selected image
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const url = URL.createObjectURL(photoFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  const handleCreateService = (data) => {
    console.log(data);

    const imageFile = data.serviceImage[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imageAPI = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_api_key
    }`;

    // Upload image to ImgBB directly from frontend
    fetch(imageAPI, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imageUrl = imgRes.data.url;
          const serviceData = {
            serviceName: data.serviceName,
            category: data.category,
            price: data.price,
            imageUrl: imageUrl,
            description: data.description,
            providerName: user?.displayName,
            providerEmail: user?.email,
            createdAt: new Date(),
          };

          axiosSecure.post("/services", serviceData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                title: "Service Created Successfully!",
                icon: "success",
              });
              reset();
              setPreview(null);
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to create service", "error");
      });
  };

  return (
    <Container>
      <div className="min-h-screen py-10 flex justify-center">
        <div className="w-full max-w-3xl rounded-2xl shadow-2xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Create a New Service
          </h2>

          <form
            onSubmit={handleSubmit(handleCreateService)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Service Name</label>
              <input
                {...register("serviceName", { required: true })}
                placeholder="Enter service name"
                className="input input-bordered w-full"
              />
              {errors.serviceName && (
                <p className="text-red-500 text-sm">Service name is required</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                {...register("category", { required: true })}
                defaultValue=""
                className="select select-primary">
                <option value="" disabled>
                  Choose a category
                </option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical Services">Electrical Services</option>
                <option value="Home Cleaning">Home Cleaning</option>
                <option value="Interior Design">Interior Design</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Painting Services">Painting Services</option>
                <option value="Gardening">Gardening</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">Category is required</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price ($)</label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="100"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">Price is required</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="text-center">Service Image</label>
              <label className="cursor-pointer">
                <div className="h-[100px] w-[300px] mx-auto border overflow-hidden flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">Select Photo</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("serviceImage", { required: true })}
                  className="hidden"
                />
              </label>
              {errors.serviceImage && (
                <p className="text-error text-sm mt-1">Photo is required</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Describe your service..."
                className="textarea textarea-bordered w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>

            {/* Provider Info */}
            <div>
              <label className="block font-medium mb-1">Provider Name</label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full "
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Provider Email</label>
              <input
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full "
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Create Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateServices;
