import { ConnectButton } from "@rainbow-me/rainbowkit"
import * as React from "react"
import PrimaryButton from "./buttons/PrimaryButton"
import OptimismLogo from "./OptimismLogo"
import { Link } from "react-router-dom"
import optidomainsLogo from "../assets/infinity-op-circle.svg"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center p-6">
        <div className="flex">
          <Link to="/">
            <div className="flex items-center">
              <img src={optidomainsLogo} style={{ width: 36 }} />

              <div className="text-xl font-bold text-red-600 ml-3 hidden sm:block">
                Opti.Domains X Bored Town
              </div>
            </div>
          </Link>
        </div>

        <div className="flex">
          {/* <Link to="/lists/create">
            <PrimaryButton className="mr-2">+ Create List</PrimaryButton>
          </Link> */}
          
          <ConnectButton />
        </div>
      </div>

      <div className="container mx-auto">
        {children}
      </div>
    </div>
  )
}