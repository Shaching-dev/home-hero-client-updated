import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import Container from "../../components/Container/Container";
import { useNavigate } from "react-router";

const CreateServices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const photoFile = watch("serviceImage");

  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const url = URL.createObjectURL(photoFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  const handleCreateService = async (data) => {
    const apiKey = import.meta.env.VITE_image_api_key;

    if (!apiKey) {
      return Swal.fire(
        "Error",
        "ImgBB API Key is missing in .env file",
        "error"
      );
    }

    setLoading(true);

    try {
      const imageFile = data.serviceImage[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (imgRes.data.success) {
        const imageUrl = imgRes.data.data.display_url;

        const serviceData = {
          serviceName: data.serviceName,
          category: data.category,
          price: parseFloat(data.price),
          imageUrl: imageUrl,
          description: data.description,
          providerName: user?.displayName,
          email: user?.email,
          providerImage: user?.photoURL,
          createdAt: new Date(),
        };

        const res = await axiosSecure.post("/services", serviceData);
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Service created successfully.",
            icon: "success",
          });
          navigate("/dashboard/my-services");
          reset();
          setPreview(null);
        }
      }
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      Swal.fire("Error", "Upload failed. Check console for details.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="min-h-screen py-10 flex justify-center">
        <div className="w-full max-w-3xl rounded-2xl shadow-2xl p-6 md:p-10 bg-base-100">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Create a New Service
          </h2>

          <form
            onSubmit={handleSubmit(handleCreateService)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <div className="md:col-span-2">
              <label className="label font-medium">Service Name</label>
              <input
                {...register("serviceName", {
                  required: "Service name is required",
                })}
                placeholder="Ex: Luxury Home Cleaning"
                className="input input-bordered w-full"
              />
              {errors.serviceName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serviceName.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="label font-medium">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                defaultValue=""
                className="select select-bordered w-full">
                <option value="" disabled>
                  Choose a category
                </option>
                <option value="Plumber">Plumber</option>
                <option value="Electrical">Electrical</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Design">Design</option>
                <option value="Gardening">Gardening</option>
                <option value="Painting">Painting</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="label font-medium">Price ($)</label>
              <input
                {...register("price", { required: "Price is required" })}
                type="number"
                placeholder="100"
                className="input input-bordered w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Image Upload UI */}
            <div className="md:col-span-2">
              <label className="label font-medium">Service Image</label>
              <label className="cursor-pointer">
                <div className="h-40 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:bg-base-200 transition-all">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500">Click to upload image</p>
                      <span className="text-xs text-gray-400">
                        (Max size: 32MB)
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  {...register("serviceImage", {
                    required: "Image is required",
                  })}
                  className="hidden"
                />
              </label>
              {errors.serviceImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serviceImage.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="label font-medium">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                placeholder="Describe what this service includes..."
                className="textarea textarea-bordered w-full"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Provider Info (Read Only) */}
            <div>
              <label className="label font-medium">Provider Name</label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>
            <div>
              <label className="label font-medium">Provider Email</label>
              <input
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Service"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateServices;
