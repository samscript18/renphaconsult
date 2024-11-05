"use client";

import Loader from "@/components/ui/loader";
import ScrollContainers from "@/components/ui/ScrollContainers";
import { useGetDestination } from "@/services/destination.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import img from "../../../../../public/images/austrialia-1.jpg";
import { Destination } from "@/schema/interfaces/destination.interface";
import { formatValue } from "@/lib/utils/format.utils";

const DestinationPage = () => {
  const { id: destinationId } = useParams<{ id: string }>();
  const { data, isPending } = useGetDestination(destinationId);
  const destination: Destination = data;
  const gallery = [
    { id: 1, img },
    { id: 2, img },
    { id: 3, img },
    { id: 4, img },
  ];
  return (
    <div className="w-full h-full mt-[8rem]">
      {isPending && (
        <Loader
          loading={isPending}
          loadingText="Fetching Destination Details..."
        />
      )}
      {gallery.length === 0 ? (
        <Image
          key={destination._id}
          src={img}
          alt={destination.name}
          className="w-auto h-[250px] rounded-md"
        />
      ) : (
        <ScrollContainers width={150}>
          {gallery.map((image) => {
            return (
              <Image
                key={image.id}
                src={image.img}
                alt={destination.name}
                className="w-auto h-[250px]"
              />
            );
          })}
        </ScrollContainers>
      )}
      <div className="py-[1.5rem]">
        <h3 className="text-[1.1rem] font-bold">Name:</h3>
        <p className="mb-0 text-[1rem]">{destination.name}</p>
        <h3 className="text-[1.1rem] font-bold mt-4">Description:</h3>
        <p className="text-[1rem] mb-4">{destination.description}</p>
        <h3 className="text-[1.1rem] font-bold">Location:</h3>
        <p className="text-[1rem] mb-4">{destination.location}</p>
        <h3 className="text-[1.1rem] font-bold">Budget:</h3>
        <h4 className="mb-0 text-[#fff] text-[1.1rem] bg-[#00628f] max-w-fit py-[0.8rem] px-[1rem] rounded-md">
          ₦{formatValue(destination.budget.toString())}
        </h4>
        <h3 className="text-[1.1rem] font-bold mt-4">Average Rating:</h3>
        <p className="text-[1rem]">{destination.averageRating}</p>
      </div>
    </div>
  );
};
export default DestinationPage;
