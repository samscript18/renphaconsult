import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { AddReviewDto, UpdateReviewDto } from "@/schema/dto/review.dto";
import { Review } from "@/schema/interfaces/destination.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddReviewToDestination = (destinationId: string) => {
  const payload = useMutation({
    mutationKey: ["useAddReviewToDestination"],
    mutationFn: async (data: AddReviewDto) => {
      const response = await https.post<Review>(
        `/review/destination/${destinationId}`,
        {
          rating: data.rating,
          comment: data.comment,
        }
      );

      return response?.data;
    },
    onError(error) {
      return errorHandler(error);
    },
  });

  return payload;
};

export const useGetDestinationReviews = (destinationId: string) => {
  const query = useQuery({
    queryKey: ["useGetDestinationReviews"],
    queryFn: async () => {
      try {
        const response = await https.get<Review[]>(
          `/review/destination/${destinationId}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useEditReview = (reviewId: string) => {
  const mutation = useMutation<Review, Error, UpdateReviewDto>({
    mutationKey: ["useEditReview"],
    mutationFn: async (data: UpdateReviewDto) => {
      const response = await https.put<Review>(`/review/${reviewId}`, data);

      return response?.data;
    },

    onError(error) {
      return errorHandler(error);
    },
  });

  return mutation;
};
