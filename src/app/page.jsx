"use client";

import CategoryList from "@/components/side/CategoryList";
import { useEffect, useState } from "react";
import RangeSelect from "@/components/side/RangeSelect";
import SelectRating from "@/components/side/SelectRating";
import BusinessList from "@/components/side/BusinessList";
import GoogleMapView from "@/components/side/GoogleMapView";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "@/redux/LocationSlice";
import { getGooglePlace } from "@/lib/GetGooglePlace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);
  const [loading, setLoading] = useState(false);
  const userLocation = useSelector((state) => state.userLocation);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("api/auth/providers/google");
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      dispatch(
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      );
    });
  };

  useEffect(() => {
    if (userLocation) {
      setLoading(true);
      getGooglePlace(category, radius, userLocation.lat, userLocation.lng)
        .then((resp) => {
          setBusinessList(resp.data.product.results);
          setBusinessListOrg(resp.data.product.results);
        })
        .catch((error) => {
          console.error("Error fetching Google Place data:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [userLocation, category, radius]);

  const onRatingChange = (rating) => {
    if (rating.length === 0) {
      setBusinessList(businessListOrg);
      return;
    }

    const filteredList = businessListOrg.filter((item) => {
      for (let i = 0; i < rating.length; i++) {
        if (item.rating >= rating[i]) {
          return true;
        }
      }
      return false;
    });

    setBusinessList(filteredList);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="p-3">
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        {/* <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        <SelectRating onRatingChange={(value) => onRatingChange(value)} /> */}
      </div>
      <div className="col-span-4 md:col-span-3">
        <div className="p-6">
          <GoogleMapView businessList={businessList} />
        </div>
        <div className="px-6 mt-4">
          <BusinessList loading={loading} businessList={businessList} />
        </div>
      </div>
    </div>
  );
}
