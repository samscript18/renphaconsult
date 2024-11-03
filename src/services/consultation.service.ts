import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { CreateConsultationDto } from "@/schema/dto/consultation.dto";
import { Consultation } from "@/schema/interfaces/consultation.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateConsultation = () => {
  const payload = useMutation({
    mutationKey: ["useCreateConsultation"],
    mutationFn: async (data: CreateConsultationDto) => {
      const response = await https.post<Consultation>("/consultation", {
        question: data.question,
        destination: data.destination,
      });

      return response?.data;
    },
    onError(error) {
      return errorHandler(error);
    },
  });

  return payload;
};

export const useGetConsultation = (consultationId: string) => {
  const query = useQuery({
    queryKey: ["useGetConsultation"],
    queryFn: async () => {
      try {
        const response = await https.get<Consultation>(
          `/consultation/${consultationId}`
        );

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};
