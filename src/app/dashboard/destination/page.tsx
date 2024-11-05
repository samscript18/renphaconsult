"use client";

import Destination from "@/components/dashboard/destination";
import Loader from "@/components/ui/loader";
import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import { useGetDestinations } from "@/services/destination.service";

const DestinationPage = () => {
  const { data: destinations, isLoading } = useGetDestinations();

  if (!destinations)
    return (
      <h2 className="text-[1.2rem] font-semibold">
        Sorry, there are no available destinations at the moment.
      </h2>
    );
  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader loading={isLoading} loadingText="Fetching Destinations..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-11 mt-[5rem]">
          {destinations.map((destination: IDestination) => {
            return <Destination key={destination._id} {...destination} />;
          })}
        </div>
      )}
    </section>
  );
};
export default DestinationPage;
