import { BigNumberish } from "ethers";
import { formatEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Card } from "../components/Card";

type Regen = {
  name: string;
  address: string;
  ensName: string;
  avatarURI: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
};

import useAppLoadContract from "../hooks/useAppLoadContract";
const Home: NextPage = () => {
  const [contractPurpose, setContractPurpose] = useState<string>("");
  const [regens, setRegens] = useState<Regen[]>([]);

  const { address, isConnecting } = useAccount();
  const { data } = useBalance({ addressOrName: address });

  useEffect(() => {
    fetch(`regens.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRegens(data.people as Regen[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center m-2 lg:mx-4">
        <div className="m-2">
          <div className="grid grid-cols-3 gap-16">
            {regens.map((regen) => (
              <Card
                key={regen.name}
                imgUrl={regen.avatarURI}
                title={regen.name}
                description={regen.bio}
                cta="View Sets"
                ctaLink={`/sets/${regen.address}`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
