import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";

import NavigationTabs from "./NavigationTabs";
import ThemeSwitch from "./ThemeSwitch";

const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center dark:bg-black">
      <div className="navbar bg-base-0  shadow-sm">
        <div className="navbar-start">
          <a className="text-sm normal-case btn btn-ghost lg:text-xl" href="/">
            {theme === "light" ? (
              <img src="/full-positive.svg" alt="🌱 Regen.Recipes" width={100} height={37} />
            ) : (
              <img src="/full-negative.svg" alt="🌱 Regen.Recipes" width={100} height={37} />
            )}
          </a>
        </div>
        <div className="hidden navbar-center lg:flex"></div>
        <div className="navbar-end">
          <div className="mx-5">
            <ConnectButton
              // chainStatus={"name"}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>
          <ThemeSwitch />
        </div>
      </div>

      {/* navigatin menu tabs  */}
      <NavigationTabs />
    </div>
  );
};
export default Header;
