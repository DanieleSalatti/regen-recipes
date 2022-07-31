/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import searchico from "searchico";
import Select from "react-select";
import { Token } from "../../types/token";
import { const_web3DialogClosedByUser } from "eth-hooks/models";

// helpers to load token name and symbol for unlisted tokens
const ERC20ABI = ["function symbol() view returns (string)", "function name() view returns (string)"];

const loadERC20 = async (address, p) => {
  try {
    // load token information here
    const r = new ethers.Contract(address, ERC20ABI, p);
    const name = await r.name?.();
    const symbol = await r.symbol?.();

    return { name, symbol };
  } catch (error) {
    return {};
  }
};

export default function TokenSelect({ onChange, chainId = 1, nativeToken = {}, localProvider, ...props }) {
  const [value, setValue] = useState(null);
  const [list, setList] = useState<Token[]>([]);
  const [searchResults, setSearchResults] = useState([]);

  const listCollection = useMemo(() => {
    return searchico(list, { keys: ["address", "name", "symbol"] });
  }, [list.length, chainId]);

  const children = useMemo(() => {
    // if (searchResults.length < 1) {
    if (list.length < 1) {
      return [];
    }

    // use search result to format children
    // return searchResults.map((i) => (
    console.log("Tokens", list);
    return list.map((i) => (
      <option key={i.address} style={{ paddingTop: "5px", paddingBottom: "5px" }} value={i.address}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {i.logoURI && (
            <div style={{ marginRight: "5px" }}>
              <img src={i.logoURI} alt={`${i.name} (${i.symbol})`} />
            </div>
          )}
          {i.name} - {i.symbol} {i.address?.substring(0, 5) + "..." + i.address?.substring(-4)}{" "}
          {i.unlisted && <span style={{ fontStyle: "italic", fontSize: "12px", marginLeft: "3px" }}> (unlisted) </span>}
        </div>
      </option>
    ));
  }, [JSON.stringify(searchResults)]);

  /*const handleSearch = async (val) => {
    let collectionResult = [];

    if (val.length > 0) {
      // TODO : Do all search & filtering here
      collectionResult = (listCollection?.find(val) || []).filter((i) => i.chainId === chainId);

      if (collectionResult.length < 1) {
        const nativeTokenObj = {
          chainId: chainId,
          decimals: 18,
          name: "Native Token",
          symbol: "ETH",
          address: "0x0000000000000000000000000000000000000000",
          logoURI: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880",
          ...nativeToken,
        };

        collectionResult.push(nativeTokenObj);

        try {
          const checksumAddress = ethers.utils.getAddress(val);
          // load contract and try to get name and symbol if there's a provider given
          const tokenInfo = localProvider ? await loadERC20(checksumAddress, localProvider) : {};
          collectionResult = [
            {
              chainId: chainId,
              name: null,
              unlisted: true,
              symbol: null,
              address: checksumAddress,
              logoURI: "",
              ...tokenInfo,
            },
          ];
        } catch (error) {
          console.log(`Could not identify this token`);
        }
      }
    }

    setSearchResults(collectionResult);
  };*/

  const handleOnChange = async (option) => {
    setSearchResults([]);

    // TODO : check if it's an address that's not on list & Add as unlisted

    setValue(option);
    console.log("DASA");

    if (typeof onChange === "function") {
      console.log("DASA Calling handler", option);
      onChange(option);
    }
  };

  const loadList = async () => {
    const res = await axios.get(
      "https://raw.githubusercontent.com/DanieleSalatti/ReFi-Tokens/main/refi.tokenlist.json"
    );
    const { tokens } = res.data;
    const tokensForChain: Token[] = tokens;

    setList(tokensForChain.filter((i) => i.chainId === chainId));
  };

  useEffect(() => {
    void loadList();
  }, []);

  useEffect(() => {
    void loadList();
  }, [chainId]);

  function getLabel({ name, symbol, logoURI }: Token): JSX.Element {
    return (
      <div style={{ alignItems: "center", display: "flex" }}>
        <span style={{ fontSize: 18, marginRight: "0.5em" }}>
          <img src={logoURI} alt={name} />
        </span>
        <span style={{ fontSize: 14 }}>
          {symbol} - {name}
        </span>
      </div>
    );
  }

  return (
    <div>
      <Select
        formatOptionLabel={getLabel}
        isSearchable={false}
        options={list}
        isMulti={false}
        isOptionSelected={(option): boolean => false}
        onChange={handleOnChange}
        placeholder="💶 Select a token"
        // styles={headerSelectStyles}
      />
    </div>
  );
}
