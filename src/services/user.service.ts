// import { https } from "@/lib/config/axios.config";
// import { errorHandler } from "@/lib/utils/error";
// import { UserStorage } from "@/lib/utils/localStorage";
// import { EditProfileDTO } from "@/schema/dto/user.dto";
// import { useMutateResult } from "@/schema/interfaces/query.interface";
// import { User } from "@/schema/interfaces/user.interface";
// import { useMutation, useQuery } from "@tanstack/react-query";

// export const useEditProfile = () => {
//   const mutation = useMutation<User, Error, EditProfileDTO>({
//     mutationKey: ["useEditProfile"],
//     mutationFn: async (data: EditProfileDTO) => {
//       const response = await https.put<{ updatedUser: User }>(
//         "/user/profile",
//         data
//       );

//       await UserStorage.store(response?.data?.updatedUser);

//       return response?.data?.updatedUser;
//     },

//     onError(error) {
//       return errorHandler(error);
//     },
//   });

//   return mutation;
// };

// export const useGetProfile = () => {
//   const query = useQuery({
//     queryKey: ["useGetProfile"],
//     queryFn: async () => {
//       try {
//         const response = await https.get<{ user: User }>(`/user/userId`);

//         await UserStorage.store(response?.data?.user);

//         return response?.data.user;
//       } catch (error) {
//         return errorHandler(error);
//       }
//     },
//   });

//   return query;
// };
