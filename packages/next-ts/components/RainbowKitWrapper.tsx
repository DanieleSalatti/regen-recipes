import { darkTheme, getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { Chain, chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { targedChains, targetNetowrks } from "./configs/appContract.config";

const RainbowKitWrapper: React.FC<any> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme());

  const [chains, setChains] = useState<Chain[]>();
  const [provider, setProvider] = useState<any>();
  const [wagmiClient, setWagmiClient] = useState<any>(undefined);

  /**----------------------
   * load rainbow confgs
   * ---------------------*/

  useEffect(() => {
    const { chains, provider } = configureChains(
      [...targedChains],
      [
        // alchemyProvider({ alchemyId: process.env.ALCHEMY_ID })
        // TODO: inifura id from env
        jsonRpcProvider({
          rpc: (chain: Chain) => {
            if (chain.id === 42) {
              // Kovan
              return {
                http: "https://kovan.infura.io/v3/e23ef6f1da494103bf900b3734e228f7",
                webSocket: "wss://kovan.infura.io/ws/v3/e23ef6f1da494103bf900b3734e228f7",
              };
            }
            if (chain.id === 10) {
              // Optimism
              return {
                http: "https://mainnet.optimism.io",
                webSocket: "wss://ws-mainnet.optimism.io",
              };
            }
            return {
              http: "https://mainnet.infura.io/v3/e23ef6f1da494103bf900b3734e228f7",
              webSocket: "wss://mainnet.infura.io/ws/v3/e23ef6f1da494103bf900b3734e228f7",
            };
          },
        }),
        /*publicProvider(),*/
      ]
    );
    console.log("RainbowKitWrapper useEffect", chains);
    setChains(chains);

    const { connectors } = getDefaultWallets({
      appName: "Regen.Finance",
      chains,
    });

    const wagmiClient = createClient({
      autoConnect: true,
      connectors: connectors,
      provider,
    });
    setWagmiClient(wagmiClient);
  }, []);

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
      {wagmiClient !== undefined && (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains as Chain[]}
            theme={currentTheme}
            appInfo={{
              appName: "Regen.Finance",
              learnMoreUrl: "https://danielesalatti.com",
            }}>
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </div>
  );
};
export default RainbowKitWrapper;
