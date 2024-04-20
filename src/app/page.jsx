"use client";

import CategoryList from "@/components/side/CategoryList";
import { useEffect, useState } from "react";
import BusinessList from "@/components/side/BusinessList";
import GoogleMapView from "@/components/side/GoogleMapView";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "@/redux/LocationSlice";
import { getGooglePlace } from "@/lib/GetGooglePlace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SelectRating from "@/components/side/SelectRating";
import RangeSelect from "@/components/side/RangeSelect";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);

  const [loading, setLoading] = useState(false);

  const userLocation = useSelector((state) => state.userLocation);
  const dispatch = useDispatch();

  const { status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("api/auth/signin/google");
    }
  }, [status, router]);

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
    if (userLocation && category) {
      setLoading(true);
      getGooglePlace(category, radius, userLocation.lat, userLocation.lng)
        .then((resp) => {
          const businesses = resp.data.product.results;
          setBusinessList(businesses);
          setBusinessListOrg(businesses);
        })
        .catch((error) => {
          console.error("Error fetching Google Place data:", error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error fetching Google Place data.",
            duration: 2000,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [userLocation, category, radius, toast]);

  const onRatingChange = (rating) => {
    if (businessList.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "First select the desired category.",
        duration: 2000,
      });
      return;
    } else {
      const filteredList =
        rating === 0
          ? businessListOrg
          : businessListOrg.filter((item) => item.rating >= rating);
      setBusinessList(filteredList);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="p-3">
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        <SelectRating onRatingChange={(value) => onRatingChange(value)} />
        {/* <RangeSelect onRadiusChange={(value) => setRadius(value)} /> */}
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
