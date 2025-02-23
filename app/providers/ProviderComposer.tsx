import { SafeAreaProvider } from "react-native-safe-area-context";
import { cloneElement, PropsWithChildren } from "react";
import { QueryClientProvider } from "./QueryClientProvider";

const providers = [<QueryClientProvider children />, <SafeAreaProvider />];

const ProviderComposer = ({ children }: PropsWithChildren) =>
  providers.reduceRight(
    (kids, parent) => cloneElement(parent, { children: kids }),
    children
  );

export { ProviderComposer };
