import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import MAP_STYLE from "@/lib/MapStyles.json";
import Markers from "./markers";
import { Skeleton } from "@/components/ui/skeleton";

function GoogleMapView({ businessList }) {
  const userLocation = useSelector((state) => state.userLocation);
  const selectedBusiness = useSelector((state) => state.selectedBusiness);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && selectedBusiness) {
      map.panTo(selectedBusiness.geometry.location);
    }
  }, [map, selectedBusiness]);

  const onLoad = useCallback((map) => setMap(map), []);

  const onUnmount = useCallback(() => setMap(null), []);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <div className="flex flex-col space-y-3">
      {!isLoaded && <Skeleton className="h-[500px] w-[100%] rounded-xl" />}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "500px",
            borderRadius: "10px",
          }}
          center={userLocation}
          zoom={13}
          options={{ styles: MAP_STYLE, disableDefaultUI: true }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerF
            position={userLocation}
            icon={{
              url: "/user-location.png",
              scaledSize: { width: 50, height: 50 },
            }}
          />
          {businessList.slice(0, 8).map((business, index) => (
            <Markers business={business} key={index} />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default GoogleMapView;
