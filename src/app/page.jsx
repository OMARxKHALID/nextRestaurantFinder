"use client";

import CategoryList from "@/components/side/CategoryList";
import { useEffect, useState } from "react";
import BusinessList from "@/components/side/BusinessList";
import GoogleMapView from "@/components/side/GoogleMapView";
import { useSelector, useDispatch } from "react-redux";
import { setUserLocation } from "@/redux/LocationSlice";
import { getGooglePlace } from "@/lib/GetGooglePlace";
import { useSession } from "next-auth/react";
import SelectRating from "@/components/side/SelectRating";
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
  const { toast } = useToast();

  useEffect(() => {
    getUserLocation();
  }, []);

  // fetch user location from the browser's geolocation API
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        );
      },
      (error) => {
        console.error("Error getting user location:", error);
        toast({
          variant: "destructive",
          title: "Error getting user location.",
          description: `${error.message}`,
          duration: 2000,
        });
      }
    );
  };

  // fetch data from Google Place API based on the selected category and user location
  useEffect(() => {
    if (userLocation && category) {
      setLoading(true);
      getGooglePlace(category, radius, userLocation.lat, userLocation.lng)
        .then((resp) => {
          console.log(resp);
          if (status === "unauthenticated") {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "First login to see the restaurants.",
              duration: 2000,
            });
            return;
          }
          const businesses = resp.data.product.results;
          console.log("businesses:", businesses);
          setBusinessList(businesses);
          setBusinessListOrg(businesses);
        })
        .catch((error) => {
          console.error("Error fetching Google Place data:", error);
          toast({
            variant: "destructive",
            title: "Error fetching Google Place data.",
            description: `${error.message}`,
            duration: 2000,
          });
        })
        .finally(() => setLoading(false));
    }
  }, [userLocation, category, radius, toast, status]);

  // on rating change, filter the business list based on the rating
  const onRatingChange = (rating) => {
    if (businessListOrg.length === 0) {
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
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <CategoryList onCategoryChange={(value) => setCategory(value)} />
          <SelectRating onRatingChange={(value) => onRatingChange(value)} />
        </div>
        <div className="md:col-span-3">
          <div className="py-2 h-full">
            <GoogleMapView businessList={businessList} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <BusinessList loading={loading} businessList={businessList} />
      </div>
    </div>
  );
}
