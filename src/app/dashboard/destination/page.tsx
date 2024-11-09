"use client";

import Destination from "@/components/dashboard/destination";
import { ButtonContained } from "@/components/ui/buttons";
import Loader from "@/components/ui/loader";
import TextField from "@/components/ui/textField";
import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import {
  useGetDestinations,
  useGetDestinationsByRecommendation,
  useGetDestinationsBySearch,
} from "@/services/destination.service";
import { FormEvent, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const DestinationPage = () => {
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<number>();
  const { data: destinations, isPending } = useGetDestinations();
  const [newDestinations, setNewDestinations] =
    useState<IDestination[]>(destinations);
  const { data: searchedDestinations, isPending: locationPending } =
    useGetDestinationsBySearch(location!);
  const { data: recommendedDestinations, isPending: budgetPending } =
    useGetDestinationsByRecommendation(budget!);

  console.log(newDestinations);

  const getDestinationsByQueries = async (e: FormEvent) => {
    e.preventDefault();
    if (location) {
      setNewDestinations(await searchedDestinations);
    }
    if (budget) {
      setNewDestinations(await recommendedDestinations);
    }
    setNewDestinations(destinations);
  };

  useEffect(() => {
    setNewDestinations(destinations);
  }, [destinations]);

  useEffect(() => {
    if (searchedDestinations || recommendedDestinations) {
      setNewDestinations(searchedDestinations || recommendedDestinations);
    }
  }, [searchedDestinations, recommendedDestinations]);
  return (
    <section>
      {isPending || locationPending || budgetPending ? (
        <div className="flex justify-center items-center">
          <Loader loading={isPending} loadingText="Fetching Destinations..." />
        </div>
      ) : (
        <div className="flex flex-col py-[8rem]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-[1.3rem] font-bold">Destinations</h1>
            <form
              onSubmit={getDestinationsByQueries}
              className="flex flex-col md:flex-row gap-6"
            >
              <TextField
                InputProps={{
                  placeholder: "Enter location",
                  type: "text",
                  value: location,
                  onChange(e) {
                    setLocation(e.target.value);
                  },
                }}
                className="mt-4 border-none"
              />
              <TextField
                InputProps={{
                  placeholder: "Enter budget",
                  type: "tel",
                  value: budget,
                  onChange(e) {
                    const value = Number(e.target.value);
                    setBudget(value);
                  },
                }}
                className="mt-4 border-none"
              />
              <ButtonContained
                type="submit"
                className="w-[20px] md:w-[30px] h-[35px] mt-4 md:mt-0 px-auto no-underline"
                loading={locationPending || budgetPending}
                disabled={
                  locationPending || budgetPending || (!budget && !location)
                }
              >
                <MdOutlineSearch size={18} className="text-[#fff]" />
              </ButtonContained>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-11 mt-[5rem]">
            {newDestinations?.map((destination: IDestination) => {
              return <Destination key={destination._id} {...destination} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};
export default DestinationPage;
