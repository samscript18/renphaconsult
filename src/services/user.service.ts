import { https } from "@/lib/config/axios.config";
import { errorHandler } from "@/lib/utils/error";
import { UserStorage } from "@/lib/utils/localStorage";
import { EditProfileDTO } from "@/schema/dto/user.dto";
import { User } from "@/schema/interfaces/user.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useEditProfile = (userId: string) => {
  const mutation = useMutation<User, Error, EditProfileDTO>({
    mutationKey: ["useEditProfile"],
    mutationFn: async (data: EditProfileDTO) => {
      const response = await https.put<User>(`/user/${userId}`, data);

      await UserStorage.store(response?.data);

      return response?.data;
    },

    onError(error) {
      return errorHandler(error);
    },
  });

  return mutation;
};

export const useGetProfile = () => {
  const query = useQuery({
    queryKey: ["useGetProfile"],
    queryFn: async () => {
      try {
        const response = await https.get<User>(`/user/profile`);

        await UserStorage.store(response?.data);

        return response?.data;
      } catch (error) {
        return errorHandler(error);
      }
    },
  });

  return query;
};
