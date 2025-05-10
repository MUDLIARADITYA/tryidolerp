// import React, { useRef, useState, useEffect } from "react";
// import Usersidebar from "../../Component/Usersidebar";

// const AttendancePage = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [taskReport, setTaskReport] = useState("");
//   const [imageCaptured, setImageCaptured] = useState(false);
//   const [capturedImageURL, setCapturedImageURL] = useState(null);
//   const [cameraError, setCameraError] = useState("");

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Error accessing webcam:", err);
//         setCameraError("⚠️ Camera access denied. Please allow permission in your browser settings.");
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current?.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleCapture = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (canvas && video) {
//       const ctx = canvas.getContext("2d");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       // Convert to image URL for preview
//       const imageDataUrl = canvas.toDataURL("image/png");
//       setCapturedImageURL(imageDataUrl);
//       setImageCaptured(true);
//     }
//   };

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { FaPowerOff } from "react-icons/fa6";
import logo from "../../assets/logo.jpg";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { RiShieldUserLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import Usersidebar from "../../Component/Usersidebar";

function AttendancePage() {
  const navigate = useNavigate();
  const [camera, setCamera] = useState(true);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [productivity, setProductivity] = useState("");
  const [isImageClicked, setIsImageClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem("isCheckedIn") === "true" // Initialize from localStorage
  );

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [imageCaptured, setImageCaptured] = useState(false);

  useEffect(() => {
    let watchId;

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(coords);
          },
          (error) => {
            console.error("Error getting location:", error.message);
            alert("Failed to retrieve location.");
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Failed to retrieve location.");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendanceData"));
    if (storedData) {
      setCheckInTime(storedData.checkin);
      setCheckOutTime(storedData.checkout);
      setCapturedImage(storedData.image);
      setLocation(storedData.location);
      setProductivity(storedData.productivity || "");
    }
  }, []);

  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleString();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    if (!location || !location.latitude || !location.longitude) {
      alert("Location data is missing.");
      return;
    }

    const locationString = `${location.latitude}, ${location.longitude}`;

    const checkInData = {
      checkin: currentTime,
      location: locationString,
    };

    try {
      const response = await axios.post(
        // "https://attendancebackend-5j69.onrender.com/api/attendance/checkin",
        "http://localhost:5000/api/attendance/checkin",
        checkInData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Check-in Success:", response.data);
      alert(
        "Check-in successful. Please do not log out; simply close the tab when you're done"
      );
      setCheckInTime(currentTime);
      setIsCheckedIn(true); // Update check-in state
      localStorage.setItem("isCheckedIn", "true"); // Store in localStorage
    } catch (error) {
      console.error("Error during check-in:", error);
      alert(
        `Failed to check-in: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // const handleCheckOut = async () => {
  //   const currentTime = new Date().toISOString();
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     alert("Authorization token is missing. Please log in again.");
  //     return;
  //   }

  //   if (!capturedImage) {
  //     alert("Captured image is missing.");
  //     return;
  //   }

  //   if (!productivity) {
  //     alert("Productivity description is missing.");
  //     return;
  //   }

  //   const checkOutData = {
  //     checkout: currentTime,
  //     image: capturedImage,
  //     description: productivity,
  //   };

  //   console.log("Check-out data:", checkOutData);

  //   try {
  //     const response = await axios.post(
  //       "http://192.168.1.16:5000/api/attendance/checkout",
  //       checkOutData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Check-out Success:", response.data);
  //     setCheckOutTime(currentTime);
  //     setIsCheckedIn(false); // Update check-in state
  //     localStorage.setItem("isCheckedIn", "false"); // Store in localStorage
  //     navigate("/success"); // Navigate to success page after check-out
  //   } catch (error) {
  //     console.error("Error during check-out:", error);
  //     alert(`Failed to check-out: ${error.response?.data?.message || error.message}`);
  //   }
  // };
  const handleCheckOut = async () => {
    const currentTime = new Date().toISOString();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    if (!capturedImage) {
      alert("Captured image is missing.");
      return;
    }

    if (!productivity) {
      alert("Productivity description is missing.");
      return;
    }

    const checkOutData = {
      checkout: currentTime,
      image: capturedImage,
      description: productivity,
    };

    console.log("Check-out data:", checkOutData);

    try {
      const response = await axios.post(
        // "https://attendancebackend-5j69.onrender.com/api/attendance/checkout",
        "http://localhost:5000/api/attendance/checkout",
        checkOutData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Check-out Success:", response.data);
      setCheckOutTime(currentTime);
      setIsCheckedIn(false); // Update check-in state
      localStorage.setItem("isCheckedIn", "false"); // Store in localStorage
      setProductivity(""); // Clear productivity state
      navigate("/success"); // Navigate to success page after check-out
    } catch (error) {
      console.error("Error during check-out:", error);
      alert(
        `Failed to check-out: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleSubmit = async () => {
    if (!checkInTime && !checkOutTime) {
      alert("Please record at least one of the times: Check-in or Check-out.");
      return;
    }

    if (!location) {
      alert("Location is required. Please record your location.");
      return;
    }

    if (!productivity) {
      alert("Mention your today's Productivity.");
      return;
    }

    setIsSubmitting(true);

    const locationString = `${location.latitude}, ${location.longitude}`;

    const attendanceData = {
      location: locationString,
      image: capturedImage,
      checkin: checkInTime ? new Date(checkInTime).toISOString() : "",
      checkout: checkOutTime ? new Date(checkOutTime).toISOString() : "",
      description: productivity,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authorization token is missing. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      // Remove productivity from localStorage
      localStorage.removeItem("attendanceData");

      // Clear productivity state
      setProductivity("");

      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Failed to submit attendance. Please try again.");
      setIsSubmitting(false);
    }
  };
  const handleCaptureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setIsImageClicked(true);

      const storedData =
        JSON.parse(localStorage.getItem("attendanceData")) || {};
      localStorage.setItem(
        "attendanceData",
        JSON.stringify({ ...storedData, image: imageData })
      );
    }
  };

  // const handleProductivityChange = async (e) => {
  //   setProductivity(e.target.value);
  //   const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};
  //   localStorage.setItem(
  //     "attendanceData",
  //     JSON.stringify({ ...storedData, productivity: e.target.value })
  //   );
  // };

  const handleProductivityChange = async (e) => {
    setProductivity(e.target.value);
    // Do not save productivity in localStorage
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
            ></video>
          </div>

          {/* Camera Error */}
          {/* {cameraError && (
            <p className="text-red-500 text-sm text-center mb-4">{cameraError}</p>
          )} */}

          {isImageClicked && (
            <p className="text-center text-yellow-500 font-medium mb-4">
              Image Clicked!
            </p>
          )}

          <div className="flex flex-col space-y-4 mb-6">
            {location && (
              <input
                type="text"
                value={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 border rounded-lg focus:outline-none"
              />
            )}
          </div>

          {/* Check-in Button */}
          {!isCheckedIn && !checkInTime && (
            <button 
              onClick={handleCheckIn}
              className="w-full mb-6 py-2 rounded text-white font-semibold shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition"
            >
              Check-in
            </button>
          )}

          {isCheckedIn && !checkOutTime && (
            <button
              onClick={handleCheckOut}
              className="w-full mb-6 py-2 rounded text-white font-semibold shadow-md bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition"
            >
              Check-out
            </button>
          )}

          {/* Task Report */}
          <label className="block text-gray-700 font-semibold mb-2">
            Today's Task Report:
          </label>
          <textarea
            className="w-full h-24 resize-none p-3 text-sm text-gray-700 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            placeholder="Provide your task report for today..."
            id="productivity"
            value={productivity}
            required
            onChange={handleProductivityChange}
          ></textarea>

          {/* Capture Image */}
          <button
            onClick={handleCaptureImage}
            className="w-full py-2 rounded text-white font-semibold shadow-md bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition"
          >
            Capture Image
          </button>

          {/* Canvas for capture */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Image Preview */}
          {/* {imageCaptured && capturedImageURL && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-medium mb-2">Image captured!</p>
              <img  
                src={capturedImageURL}
                alt="Captured"
                className="rounded-lg mx-auto w-32 h-32 object-cover border"
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
    