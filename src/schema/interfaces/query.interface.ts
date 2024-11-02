export interface useMutateResult<T> {
  data?: T;
  isPending: boolean;
  isError: boolean;
  mutateAsync: Function;
}

export interface useQueryResult<T> {
  data?: T;
  isLoading: boolean;
  isError: boolean;
  refetch: Function;
}
