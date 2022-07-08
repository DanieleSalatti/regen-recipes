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

  const { data: accountData, isLoading } = useAccount();
  const { data } = useBalance({ addressOrName: accountData?.address });

  const YourContract = useAppLoadContract({
    contractName: "YourContract",
  });

  const getPurpose = useCallback(async () => {
    const purpose = await YourContract?.purpose();
    setContractPurpose(purpose as string);
  }, [YourContract]);

  useEffect(() => {
    void getPurpose();
    fetch(`regens.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRegens(data.people);
      });
  }, [YourContract, getPurpose]);

  return (
    <>
      <main className="flex flex-col items-start justify-center m-2 lg:mx-4">
        <div className="m-2">
          <div className="grid grid-cols-3 gap-16">
            {regens.map((regen) => (
              <Card
                key={regen.name}
                imgUrl={regen.avatarURI}
                title={regen.name}
                description={regen.bio}
                cta="View Sets"
                ctaLink={regen.twitter}
                ctaRoute={`/sets/${regen.address}`}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
