import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { chains, wagmiClient } from "./configs/appContract.config";

const RainbowKitWrapper: React.FC<any> = ({ children }) => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme());

  // set current rainbow theme
  useEffect(() => {
    if (theme === "light") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCurrentTheme(lightTheme() as any);
    }

    if (theme === "dark") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCurrentTheme(darkTheme() as any);
    }
  }, [theme]);

  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={currentTheme}
          appInfo={{
            appName: "Regen.Recipes",
            learnMoreUrl: "https://danielesalatti.com",
          }}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};
export default RainbowKitWrapper;
