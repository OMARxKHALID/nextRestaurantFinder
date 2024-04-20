"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { setUserLocation } from "@/redux/LocationSlice";
import { useDispatch } from "react-redux";
import LoginForm from "./login";
import Profile from "./profile";

const PLACES = ["places"];

export default function Navbar() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: PLACES,
  });

  const [autocomplete, setAutocomplete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const onLoad = useCallback((autocomplete) => {
    setAutocomplete(autocomplete);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place?.geometry?.location;
      if (location) {
        const latLng = {
          lat: location.lat(),
          lng: location.lng(),
        };
        console.log("🚀 ~ onPlaceChanged ~ latLng:", latLng);
        dispatch(setUserLocation(latLng));
      }
      setSearchValue("");
    }
  }, [autocomplete, dispatch]);

  const handleSearch = () => {
    if (autocomplete) {
      onPlaceChanged();
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <>
      <nav className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center font-semibold text-xl space-x-6"
          passHref
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
            priority={true}
          />
        </Link>
        {isLoaded && (
          <div className="hidden sm:flex w-full max-w-sm items-center space-x-2">
            {/* <div className="pac-container pac-logo">
              <div className="pac-item">
                <span className="pac-icon pac-icon-marker"></span>
                <span className="pac-item-query">
                  <span>France</span>
                </span>
              </div>
            </div> */}
            <div className="relative w-full">
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <Input
                  placeholder="Search"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Autocomplete>

              <div className="absolute inset-y-0 right-0 flex items-center px-2.5 cursor-pointer">
                <SearchIcon
                  className="h-5 w-5 opacity-60"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        )}
        <div>
          <RenderProfile />
        </div>
      </nav>
    </>
  );
}

function RenderProfile() {
  const { data: session, status } = useSession();

  if (typeof window !== "undefined" && status === "loading") return null;

  return session?.user ? <Profile user={session.user} /> : <LoginForm />;
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
