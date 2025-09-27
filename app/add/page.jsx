"use client";
import { useState } from "react";
import { useGoals } from "../../contexts/GoalContext";
import { useRouter } from "next/navigation";
import { Target, Upload, X, ArrowLeft} from "lucide-react";

export default function AddGoal() {
  const { addGoal } = useGoals();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    addGoal(title, description, image);

    // clear form
    setTitle("");
    setDescription("");
    setImage(null);
    setImagePreview("");

    // redirect
    router.push("/");
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      validateAndSetImage(file);
    }
  };

  const validateAndSetImage = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    if(!validTypes.includes(file.type)){
      alert('Please select a valid image file (PNG, JPG, or GIF)');
      return;
    }
    if(file.size > 10 * 1024 * 1024){
      alert('File sizze must be less than 10MB');
      return;
    }
    setImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragging(false);
  }
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
  
    const files = e.dataTransfer.files;
    if(files.length > 0){
      validateAndSetImage(files[0]);
    }
  };
  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-lg">

      <button onClick={() => router.push("/")}
        className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Goals</span>
        </button>
      
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-semibold">Add New Goal</h1>
      </div>
      <p className="text-gray-400 mb-6">
        Set a new goal and start your journey to success
      </p>

      <h2 className="text-xl font-bold mb-4">Goal Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block mb-2 text-sm font-medium">Goal Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Learn a new programming language"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your goal in detail."
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

         {/* Proof Image */}
        <div>
          <label className="block mb-2 text-sm font-medium">Proof Image (Optional)</label>
          
          {!imagePreview ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging 
                  ? "border-blue-400 bg-blue-900/20" 
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onClick={() => document.getElementById("imageInput").click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400">PNG, JPG or GIF (MAX. 10MB)</p>
              <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={handleImageChange}
              />
            </div>
          ) : (
            <div className="relative">
              <div className="border border-gray-600 rounded-lg p-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-48 mx-auto rounded"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-600 rounded-full hover:bg-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2 text-center">
                Click the X button to remove the image
              </p>
            </div>
          )}
        </div>



        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setDescription("");
              router.push("/");
            }}
            className="px-4 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-medium"
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
}