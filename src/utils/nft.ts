import { Client, NftData } from "@covalenthq/client-sdk";
import { PublicClient } from "viem";
import BaseOfBoredAbi from "../abi/BaseOfBored.json";
import axios from "axios";

export interface NftDataWith6551 extends NftData {

}

const client = new Client(import.meta.env.VITE_COVALENT_API_KEY);

export async function loadNfts(walletAddress: string, publicClient: PublicClient) {
  const resp = await client.NftService.getNftsForAddress("base-mainnet", walletAddress, {"withUncached": true,"noNftAssetMetadata": true});
  const data: NftDataWith6551[] | undefined = resp.data.items.find(item => item.contract_address == import.meta.env.VITE_BASE_OF_BORED_ADDRESS)?.nft_data

  if (!data) return []

  for (let item of data) {
    const tokenURI: string = await publicClient.readContract({
      address: import.meta.env.VITE_BASE_OF_BORED_ADDRESS,
      abi: BaseOfBoredAbi,
      functionName: "tokenURI",
      args: [item.token_id],
    }) as string

    console.log(tokenURI);

    const tokenMetadata = (await axios.get(tokenURI.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/"))).data
    console.log(tokenMetadata)

    item.token_url = tokenMetadata.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
  }

  return data
}