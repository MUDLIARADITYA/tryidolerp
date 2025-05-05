import React, { useRef, useState, useEffect } from "react";
import Usersidebar from "../../Component/Usersidebar";

const AttendancePage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [taskReport, setTaskReport] = useState("");
  const [imageCaptured, setImageCaptured] = useState(false);
  const [capturedImageURL, setCapturedImageURL] = useState(null);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setCameraError("⚠️ Camera access denied. Please allow permission in your browser settings.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to image URL for preview
      const imageDataUrl = canvas.toDataURL("image/png");
      setCapturedImageURL(imageDataUrl);
      setImageCaptured(true);
    }
  };

  return (
    <div className="flex">
      <Usersidebar />
      <div className="min-h-screen bg-gray-200 flex items-center justify-center flex-grow p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Attendance Page
          </h2>

          {/* Camera Preview */}
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300 overflow-hidden mb-4 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          </div>

          {/* Camera Error */}
          {cameraError && (
            <p className="text-red-500 text-sm text-center mb-4">{cameraError}</p>
          )}

          {/* Check-in Button */}
          <button className="w-full mb-6 py-2 rounded text-white font-semibold shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition">
            Check-in
          </button>

          {/* Task Report */}
          <label className="block text-gray-700 font-semibold mb-2">
            Today's Task Report:
          </label>
          <textarea
            className="w-full h-24 resize-none p-3 text-sm text-gray-700 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            placeholder="Provide your task report for today..."
            value={taskReport}
            onChange={(e) => setTaskReport(e.target.value)}
          />

          {/* Capture Image */}
          <button
            onClick={handleCapture}
            className="w-full py-2 rounded text-white font-semibold shadow-md bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition"
          >
            Capture Image
          </button>

          {/* Canvas for capture */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Image Preview */}
          {imageCaptured && capturedImageURL && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-medium mb-2">Image captured!</p>
              <img  
                src={capturedImageURL}
                alt="Captured"
                className="rounded-lg mx-auto w-32 h-32 object-cover border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
    