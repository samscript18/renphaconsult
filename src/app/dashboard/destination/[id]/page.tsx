"use client";

import Loader from "@/components/ui/loader";
import ScrollContainers from "@/components/ui/ScrollContainers";
import { useGetDestination } from "@/services/destination.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import img from "../../../public/images/img-1.jpg";

const DestinationPage = () => {
  const { id: destinationId } = useParams<{ id: string }>();
  const { data: destination, isLoading } = useGetDestination(destinationId);

  if (isLoading)
    return (
      <Loader loading={isLoading} loadingText="Fetching Destinations..." />
    );
  return (
    <div>
      <ScrollContainers width={150} displayWidgets={false}>
        {destination.gallery.map(() => {
          return (
            <Image
              key={destination._id}
              src={img}
              alt={destination.name}
              width={100}
              height={400}
            />
          );
        })}
      </ScrollContainers>
      <Image
        src={destination.mainImage}
        alt={destination.name}
        width={100}
        height={400}
      />
      <footer className="py-[1.5rem] px-[2rem]">
        <div className="flex justify-between items-center mb-[1.5rem]">
          <h4 className="mb-0">{destination.name}</h4>
          <h4 className="mb-0 text-[#fff] bg-[#00628f] py-[0.25rem] px-[0.5rem] rounded-sm">
            ₦{destination.budget}
          </h4>
        </div>
        <p>{destination.description}</p>
      </footer>
    </div>
  );
};
export default DestinationPage;
