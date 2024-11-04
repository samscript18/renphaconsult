"use client";

import Destination from "@/components/dashboard/destination";
import Loader from "@/components/ui/loader";
import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import { useGetDestinations } from "@/services/destination.service";

const DestinationPage = () => {
  const { data: destinations, isLoading } = useGetDestinations();

  if (isLoading)
    return (
      <Loader loading={isLoading} loadingText="Fetching Destinations..." />
    );
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination: IDestination) => {
          return <Destination key={destination._id} {...destination} />;
        })}
      </div>
    </section>
  );
};
export default DestinationPage;
