"use client";

import Destination from "@/components/dashboard/destination";
import { ButtonContained } from "@/components/ui/buttons";
import Loader from "@/components/ui/loader";
import TextField from "@/components/ui/textField";
import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import {
  useGetDestinations,
  useGetDestinationsBySearch,
} from "@/services/destination.service";
import { FormEvent, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const DestinationPage = () => {
  const [location, setLocation] = useState<string>("");
  const { data: destinations, isPending } = useGetDestinations();
  const [newDestinations, setNewDestinations] =
    useState<IDestination[]>(destinations);
  const { data: searchedDestinations, isPending: locationPending } =
    useGetDestinationsBySearch(location!);

  const getDestinationsByQueries = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location) {
      setNewDestinations(await searchedDestinations);
    }
    setNewDestinations(destinations);
  };

  useEffect(() => {
    setNewDestinations(destinations);
  }, [destinations]);

  useEffect(() => {
    setNewDestinations(searchedDestinations);
  }, [searchedDestinations]);

  if (destinations?.length === 0 || searchedDestinations.length === 0) {
    return (
      <div className="flex justify-center items-center mt-[7rem]">
        <h1 className="text-[1.3rem]">
          Sorry, there are no destinations available at the moment
        </h1>
      </div>
    );
  }
  return (
    <section>
      {isPending || locationPending ? (
        <div className="flex justify-center items-center mt-[8rem]">
          <Loader
            loading={isPending || locationPending}
            loadingText="Fetching Destinations..."
          />
        </div>
      ) : (
        <div className="flex flex-col py-[8rem]">
          <form
            onSubmit={getDestinationsByQueries}
            className="flex flex-col md:flex-row justify-center md:justify-between items-center"
          >
            <h1 className="text-[1.3rem] font-bold">Destinations</h1>
            <div className="flex flex-col md:flex-row gap-6">
              <TextField
                InputProps={{
                  placeholder: "Enter location",
                  type: "text",
                  id: "location",
                  name: "location",
                  value: location,
                  onChange(e) {
                    setLocation(e.target.value);
                  },
                }}
                className="mt-4 border-none"
              />
              <ButtonContained
                type="submit"
                className="w-[20px] md:w-[30px] h-[35px] mt-4 md:mt-0 px-auto no-underline"
                loading={locationPending}
                disabled={locationPending && !location}
                loadingText="Fetching..."
              >
                {!locationPending && (
                  <MdOutlineSearch size={18} className="text-[#fff]" />
                )}
              </ButtonContained>
            </div>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-11 mt-[5rem]">
            {(newDestinations || destinations)?.map(
              (destination: IDestination) => {
                return <Destination key={destination._id} {...destination} />;
              }
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default DestinationPage;
