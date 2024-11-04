import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { Destination } from "@/schema/interfaces/destination.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetDestinations = () => {
  const query = useQuery({
    queryKey: ["useGetDestinations"],
    queryFn: async () => {
      try {
        const response = await https.get<Destination[]>(`/destination`);

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useGetDestinationsBySearch = (location: string) => {
  const query = useQuery({
    queryKey: ["useGetDestinationsBySearch"],
    queryFn: async () => {
      try {
        const response = await https.get<Destination[]>(
          `/destination/search?search=${location}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useGetDestinationsByRecommendation = (budget: number) => {
  const query = useQuery({
    queryKey: ["useGetDestinationsByRecommendation"],
    queryFn: async () => {
      try {
        const response = await https.get<Destination[]>(
          `/destination/recommend?recommend=${budget}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};

export const useGetDestination = (destinationId: string) => {
  const query = useQuery({
    queryKey: ["useGetDestination"],
    queryFn: async () => {
      try {
        const response = await https.get<Destination>(
          `/destination/${destinationId}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};
