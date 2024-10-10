// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet } from "@txnlab/use-wallet-react";
import React, { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";

const AuthLayout = () => {
  const { wallets, activeAddress } = useWallet();

  useEffect(() => {
    if (wallets[0].isConnected) {
      redirect("/");
    }
  }, [wallets[0].isConnected]);
  return (
    <div id="login" className="flex h-[100vh] items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
