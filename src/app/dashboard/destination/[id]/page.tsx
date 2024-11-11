"use client";

import Loader from "@/components/ui/loader";
import ScrollContainers from "@/components/ui/ScrollContainers";
import { useGetDestination } from "@/services/destination.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import img from "../../../../../public/images/austrialia-1.jpg";
import { Destination, Review } from "@/schema/interfaces/destination.interface";
import { formatValue } from "@/lib/utils/format.utils";
import {
  useAddReviewToDestination,
  useGetDestinationReviews,
} from "@/services/review.service";
import TextField from "@/components/ui/textField";
import { ButtonContained } from "@/components/ui/buttons";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const DestinationPage = () => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const { id: destinationId } = useParams<{ id: string }>();
  const { data: destinationData, isPending } = useGetDestination(destinationId);
  const { data: reviewsData, isLoading } =
    useGetDestinationReviews(destinationId);
  const destination: Destination = destinationData;
  const reviews: Review[] = reviewsData;

  const payload = useAddReviewToDestination(destinationId);

  const addReview = async (e: FormEvent) => {
    e.preventDefault();
    await payload.mutateAsync({ rating, comment });
    toast.success("Review has been added");
  };

  return (
    <div className="w-full h-full mt-[8rem]">
      {isPending || isLoading ? (
        <Loader
          loading={isPending || isLoading}
          loadingText="Fetching Destination Details..."
        />
      ) : (
        <>
          {destination.gallery?.length === 0 ? (
            <Image
              key={destination._id}
              src={img}
              alt={destination.name}
              className="w-auto h-[250px] rounded-md"
            />
          ) : (
            <ScrollContainers>
              {destination.gallery?.map((image, index) => {
                return (
                  <Image
                    key={index}
                    src={image}
                    alt={destination.name}
                    width={250}
                    height={250}
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
              ₦{formatValue(destination.budget?.toString())}
            </h4>
            <h3 className="text-[1.1rem] font-bold mt-4">Average Rating:</h3>
            <p className="text-[1rem]">{destination.averageRating}</p>
          </div>
          {reviews?.length === 0 ? (
            <div className="flex justify-center items-center">
              <p className="text-[1rem]">
                There are no reviews on this destination for now
              </p>
            </div>
          ) : (
            <div className="my-[2rem]">
              <h2 className="text-[1.25rem] font-bold mb-6">Reviews</h2>
              {reviews?.map((review) => {
                return (
                  <div
                    key={review._id}
                    className="flex justify-start items-start gap-6"
                  >
                    <Image
                      src={review.user?.profilePicture as string}
                      alt={review.user?.firstName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="mb-2.5 text-[1rem] font-semibold">
                        {review.user?.firstName}
                      </p>
                      <p className="text-[.9rem]">{review.comment}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <form
            onSubmit={addReview}
            className="w-full md:w-[40vw] flex flex-col"
          >
            <TextField
              InputProps={{
                placeholder: "Enter your comments to review this destination",
                type: "text",
                required: true,
                value: comment,
                onChange(e) {
                  setComment(e.target.value);
                },
              }}
              multiline
              className="mt-4 border-none"
            />
            <TextField
              InputProps={{
                placeholder: "Rate this destination",
                type: "tel",
                required: true,
                value: rating,
                onChange(e) {
                  const value = Number(e.target.value);
                  setRating(value);
                },
              }}
              className="mt-4 border-none"
            />
            <ButtonContained
              type="submit"
              className="mt-2 w-[100px] no-underline md:w-[200px]"
              loading={payload.isPending}
              disabled={payload.isPending || !comment}
            >
              Add
            </ButtonContained>
          </form>
        </>
      )}
    </div>
  );
};
export default DestinationPage;
