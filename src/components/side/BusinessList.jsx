import { useDispatch } from "react-redux";
import BusinessItem from "./BusinessItem";
import { setSelectedBusiness } from "@/redux/BusinessSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SkeletonLoading from "@/components/ui/loading";

function BusinessList({ businessList, loading }) {
  const dispatch = useDispatch();

  return (
    <div>
      {!loading ? (
        <Carousel>
          <CarouselContent>
            {businessList.slice(0, 10).map((item, index) => (
              <div
                key={index}
                onClick={() => dispatch(setSelectedBusiness(item))}
              >
                <CarouselItem>
                  <BusinessItem business={item} />
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
          {businessList.length > 0 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      ) : (
        <div className="flex overflow-scroll overflow-x-auto gap-2 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <SkeletonLoading key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BusinessList;
