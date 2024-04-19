import { useDispatch } from "react-redux";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import BusinessItem from "./BusinessItem";
import { useSelector } from "react-redux";
import { setSelectedBusiness } from "@/redux/BusinessSlice";

function Markers({ business }) {
  const selectedBusiness = useSelector((state) => state.selectedBusiness);
  const dispatch = useDispatch();

  const isBusinessSelected =
    selectedBusiness && selectedBusiness.reference === business.reference;

  return (
    <div>
      <MarkerF
        position={business.geometry.location}
        onClick={() => dispatch(setSelectedBusiness(business))}
        icon={{
          url: "/circle.png",
          scaledSize: {
            width: 12,
            height: 12,
          },
        }}
      >
        {isBusinessSelected && (
          <OverlayView
            position={business.geometry.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="ml-[-90px] mt-[-230px]">
              <BusinessItem business={business} showDir={true} />
            </div>
          </OverlayView>
        )}
      </MarkerF>
    </div>
  );
}

export default Markers;
