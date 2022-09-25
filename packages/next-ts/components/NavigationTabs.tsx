import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineHome } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";

/**----------------------
 * add new tab here
 * ---------------------*/
const navigationTabs = [
  { tabName: "Home", pageName: "/", icon: <AiOutlineHome /> },
  { tabName: "New Set", pageName: "/new", icon: <VscAdd /> },
];

const NavigationTabs: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <>
      <div className="m-2 hidden md:block">
        <ul className="menu flex justify-center menu-horizontal bg-base-100 rounded-box  ">
          {navigationTabs.map((tab) => {
            return (
              <li
                className={`${pathname === tab.pageName ? " " : "tooltip tooltip-info"}`}
                data-tip={tab.tabName}
                key={tab.tabName}>
                <Link href={tab.pageName}>
                  <a className="text--xs">
                    <span>{tab.icon ? tab.icon : ""}</span>
                    <span>{tab.tabName}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* mobile navigation */}
      <div className="dropdown mr-auto md:hidden w-96">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>

        <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box   ">
          {navigationTabs.map((tab) => {
            return (
              <li
                className={`${pathname === tab.pageName ? "" : "tooltip-info"}`}
                data-tip={tab.tabName}
                key={tab.tabName}>
                <Link href={tab.pageName}>
                  <a>
                    <span>{tab.icon ? tab.icon : ""}</span>
                    <span>{tab.tabName}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default NavigationTabs;
