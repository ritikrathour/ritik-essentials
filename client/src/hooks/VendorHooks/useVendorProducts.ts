import { useState } from "react";
import { IVendorProucts } from "../../utils/Types/Vendor.types";
import { useQuery } from "@tanstack/react-query";
import { VendorProductsKeys } from "../../TanstackQuery/Querykeys";
import { VendorProductsApi } from "../../services/VendorApi.service";

export const UseVendorProducts = () => {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: VendorProductsKeys.all,
    queryFn: () => VendorProductsApi?.getCurrVendorProduct("knasdf", "fasdf"),
    enabled: true,
    refetchOnWindowFocus: false,
  });
  return { data, error, isError, isLoading, refetch };
};
