"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Copy, Upload } from "lucide-react"
import placeholderShirt from "./assets/tshirt-placeholder.png"
import "./App.css"

// Theme styles
const themes = {
  default: {
    bg: "bg-gray-100",
    primary: "bg-green-500 hover:bg-green-600",
    secondary: "bg-gray-400 hover:bg-gray-500 flex flex-col items-center",
    accent: "border-gray-400",
    text: "text-gray-800",
    font: "font-sans",
    layout: "grid grid-cols-1 md:grid-cols-2 gap-6",
    card: "bg-white rounded-lg shadow-md p-4",
    input: "w-full p-2 border rounded",
    button: "w-full py-3 rounded text-white font-bold",
    preview:
      "relative w-full aspect-[3/4] bg-white rounded-lg shadow-md overflow-hidden",
  },
  retro: {
    bg: "bg-amber-50",
    primary: "bg-amber-600 hover:bg-amber-700",
    secondary: "bg-amber-800 hover:bg-amber-900 flex flex-col items-center",
    accent: "border-amber-400 border-dashed",
    text: "text-amber-900",
    font: "font-mono",
    layout: "flex flex-col gap-8",
    card: "bg-amber-100 border-2 border-amber-800 p-6 rounded-none",
    input: "w-full p-3 border-2 border-amber-800 bg-amber-50 font-mono",
    button:
      "w-full py-3 border-2 border-amber-900 text-amber-900 font-bold hover:bg-amber-200",
    preview:
      "relative w-full aspect-square bg-amber-100 border-4 border-double border-amber-800 overflow-hidden",
  },
  futuristic: {
    bg: "bg-slate-900",
    primary: "bg-violet-600 hover:bg-violet-700",
    secondary:
      "bg-slate-800 hover:bg-slate-700 border border-violet-500 flex flex-col items-center text-white",
    accent: "border-violet-500 border-2",
    text: "text-violet-100",
    font: "font-sans tracking-wide",
    layout: "px-auto grid grid-cols-1 lg:grid-cols-2 gap-5 justify-items-right",
    card: "bg-slate-800 rounded-xl border border-violet-500 p-6 shadow-lg shadow-violet-900/20",
    input:
      "w-full p-3 border border-violet-500 bg-slate-800 text-violet-100 rounded-lg",
    button:
      "w-full py-3 rounded-xl text-violet-100 font-bold uppercase tracking-wider",
    preview:
      "relative w-full aspect-[3/4] bg-slate-800 rounded-xl border border-violet-500 shadow-lg shadow-violet-900/20 overflow-hidden",
  },
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [currentTheme, setCurrentTheme] = useState("default")
  const fileInputRef = useRef(null)
  const theme = themes[currentTheme]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
       theme: 'default',
      height: "180",
      weight: "80",
      build: "athletic",
      customText: "",
    },
  })

  const formValues = watch()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "q") {
        setCurrentTheme((prev) => {
          const themeKeys = Object.keys(themes)
          const currentIndex = themeKeys.indexOf(prev)
          const nextIndex = (currentIndex + 1) % themeKeys.length
          return themeKeys[nextIndex]
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const onSubmit = (data) => {
    console.log("Form submitted:", data, selectedFile)
    // In a real app, this would send the data to a backend
    alert("T-shirt customization saved!")
  }

  return (
    <div className={`min-h-screen ${theme.bg}`}>
      {/* Header */}

      {/* Main Content */}
      <main className={`w-full p-6 `} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={theme.layout + " mx-auto"}>
            {/* Left Column - Image Upload */}
            <div className="space-y-6">
              <div
                className={`border-2 ${theme.accent} rounded p-6 flex flex-col items-center justify-center ${theme.card}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="w-16 h-16 mb-4">
                  <Upload className={`w-full h-full ${theme.text}`} />
                </div>
                <p className={`text-center mb-4 ${theme.text} ${theme.font}`}>
                  Drop an image here or
                </p>
                <button
                  type="button"
                  className={`px-4 py-2 rounded text-white ${theme.primary}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <p className={`text-sm ${theme.text} mt-2 ${theme.font}`}>
                  10 MB maximum
                </p>
              </div>

              <p className={`${theme.text} ${theme.font}`}>
                {selectedFile ? selectedFile.name : "No image selected"}
              </p>

              {/* T-shirt Preview */}
              <div className={`${theme.preview}`}>
                {previewUrl ? (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Custom t-shirt design"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={placeholderShirt || "/placeholder.svg"}
                    alt="T-shirt"
                    className="w-full h-full object-contain"
                  />
                )}

                {formValues.customText && (
                  <div className="absolute inset-x-0 top-1/2 flex items-center justify-center">
                    <div className="w-[60%] text-center">
                      <p
                        className={`font-bold text-black whitespace-pre-line ${theme.font}`}
                      >
                        {formValues.customText}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Form Controls */}
            <div
              className={`space-y-6 ${theme.futuristic ? "lg:col-span-2" : ""}`}
            >
              {/* Body Measurements */}
              <div className={theme.card}>
                <h2
                  className={`text-lg font-bold mb-4 ${theme.text} ${theme.font}`}
                >
                  Body Measurements
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="height"
                      className={`block mb-1 ${theme.text} ${theme.font}`}
                    >
                      Height (cm)
                    </label>
                    <input
                      id="height"
                      type="number"
                      {...register("height", {
                        required: true,
                        min: 100,
                        max: 250,
                      })}
                      className={theme.input}
                    />
                    {errors.height && (
                      <span className="text-red-500 text-sm">
                        Height is required (100-250cm)
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="weight"
                      className={`block mb-1 ${theme.text} ${theme.font}`}
                    >
                      Weight (kg)
                    </label>
                    <input
                      id="weight"
                      type="number"
                      {...register("weight", {
                        required: true,
                        min: 30,
                        max: 200,
                      })}
                      className={theme.input}
                    />
                    {errors.weight && (
                      <span className="text-red-500 text-sm">
                        Weight is required (30-200kg)
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="build"
                      className={`block mb-1 ${theme.text} ${theme.font}`}
                    >
                      Build
                    </label>
                    <select
                      id="build"
                      {...register("build", { required: true })}
                      className={theme.input}
                    >
                      <option value="lean">Lean</option>
                      <option value="regular">Regular</option>
                      <option value="athletic">Athletic</option>
                      <option value="big">Big</option>
                    </select>
                    {errors.build && (
                      <span className="text-red-500 text-sm">
                        Build is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Custom Text */}
              <div className={theme.card}>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="customText"
                    className={`font-bold ${theme.text} ${theme.font}`}
                  >
                    Custom Text (max 3 lines)
                  </label>
                  <button
                    type="button"
                    className={`text-${theme.text} hover:opacity-70`}
                    onClick={() => setValue("customText", "")}
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <textarea
                  id="customText"
                  {...register("customText", {
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 characters",
                    },
                    validate: (value) =>
                      value.split("\n").length <= 3 ||
                      "Maximum 3 lines allowed",
                  })}
                  rows={3}
                  placeholder="Enter text to print on your t-shirt..."
                  className={theme.input}
                />
                {errors.customText && (
                  <span className="text-red-500 text-sm">
                    {errors.customText.message}
                  </span>
                )}
              </div>

              {/* Size Recommendation */}
              <div
                className={`p-4 rounded-lg ${theme.secondary} ${theme.font}`}
              >
                <h3 className="font-bold mb-2">Size Recommendation</h3>
                <p>Based on your measurements:</p>
                <p className="text-xl font-bold mt-2">
                  {formValues.build === "athletic" || formValues.build === "big"
                    ? Number.parseInt(formValues.weight) > 90
                      ? "XL"
                      : "L"
                    : Number.parseInt(formValues.weight) > 80
                    ? "L"
                    : "M"}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`${theme.button} ${theme.primary}`}
              >
                Save Customization
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App
