import useSWR from "swr";

import { apiFetcher } from "@api/helpers";

import { CurrencyType } from "../types/CryptoType";

export const useCryptoCurrencyList = () => {
  const { data, error } = useSWR<CurrencyType[]>(
    `/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d`,
    apiFetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return { data, isLoading: !error && !data };
};
