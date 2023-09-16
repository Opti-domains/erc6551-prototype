import React, { useCallback, useEffect, useState } from "react"
import Layout from "../../components/Layout"
import LayoutSideInfo from "../../components/LayoutSideInfo"
import { LOREM } from "../../utils/lorem"
import { NftDataWith6551, loadNfts } from "../../utils/nft"
import { useAccount, usePublicClient } from "wagmi"
import { Skeleton } from "antd"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import optidomainsLogo from "../../assets/infinity-op-circle.svg"

export default function ListsPage() {
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const [nfts, setNfts] = useState<NftDataWith6551[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNfts = useCallback(async () => {
    if (address) {
      const data = await loadNfts(address, publicClient)
      console.log(data)
      setNfts(data)
      setLoading(false)
    }
  }, [address, publicClient])

  useEffect(() => {
    if (address) {
      fetchNfts();
    }
  }, [address, publicClient])

  return (
    <Layout>
      <div>
        <div className="mb-4">
          <div className="text-2xl font-bold">Town Domains</div>
        </div>

        <div className="flex flex-col mb-6">
          <div className="rounded-2xl bg-white border border-gray-300 p-4 w-full flex items-center">
            <div className="mr-3">
              <img src={optidomainsLogo} style={{ width: 48 }} />
            </div>

            <div className="flex-grow">
              <div className="text-xl">chomtana.town</div>
              <div className="mt-1 text-sm">ERC-6551 Wallet: {0 == 0 ? '0x2F1a...6A72' : '0x843a...b1CA'}</div>
            </div>

            <div className="ml-3">
              <PrimaryButton>
                {0 == 0 ? 'WalletConnect' : 'Deploy Wallet'}
              </PrimaryButton>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-bold">Base of Bored</div>
        </div>

        {loading ? (
          <div className="mt-5">
            <Skeleton active />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {nfts.map((nft, i) => (
              <div className="rounded-2xl bg-white border border-gray-300 p-4 w-full" key={nft.token_id?.toString()}>
                <div><img src={nft.token_url} style={{width: "100%"}} /></div>

                <div className="text-xl mt-3">Base of Bored</div>
                <div>#{nft.token_id?.toString()}</div>
                <div className="mt-1">ERC-6551 Wallet: {i == 0 ? '0x1a8F...3B2d' : '0x843a...b1CA'}</div>

                <div className="mt-3">
                  <PrimaryButton>
                    {i == 0 ? 'WalletConnect' : 'Deploy Wallet'}
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const ListsPageRoute =   {
  path: "/",
  element: <ListsPage />,
}