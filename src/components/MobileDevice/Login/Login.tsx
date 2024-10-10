import React, { useEffect, useMemo, useCallback } from "react";
import {
  NetworkId,
  WalletId,
  useWallet,
  type Wallet,
} from "@txnlab/use-wallet-react";
import algosdk from "algosdk";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const {
    algodClient,
    activeNetwork,
    activeAddress,
    setActiveNetwork,
    transactionSigner,
    wallets,
  } = useWallet();
  const [isConnected, setIsConnected] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [magicEmail, setMagicEmail] = React.useState("");

  const navigate = useNavigate();
  console.log("Wallets", wallets);

  const isMagicLink = (wallet: Wallet) => wallet.id === WalletId.MAGIC;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(magicEmail);

  const isConnectDisabled = (wallet: Wallet) => {
    if (wallet.isConnected) {
      return true;
    }

    if (isMagicLink(wallet) && !isEmailValid) {
      return true;
    }

    return false;
  };

  const getConnectArgs = (wallet: Wallet) => {
    if (isMagicLink(wallet)) {
      return { email: magicEmail };
    }

    return undefined;
  };

  const setActiveAccount = (
    event: React.ChangeEvent<HTMLSelectElement>,
    wallet: Wallet,
  ) => {
    const target = event.target;
    setIsConnected(true);
    wallet.setActiveAccount(target.value);
  };

  const sendTransaction = async () => {
    try {
      if (!activeAddress) {
        throw new Error("[App] No active account");
      }

      const atc = new algosdk.AtomicTransactionComposer();
      const suggestedParams = await algodClient.getTransactionParams().do();

      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: activeAddress,
        receiver: activeAddress,
        amount: 0,
        suggestedParams,
      });

      atc.addTransaction({ txn: transaction, signer: transactionSigner });
      console.info(`[App] Sending transaction...`, transaction);

      setIsSending(true);
      const result = await atc.execute(algodClient, 4);
      console.info(`[App] ✅ Successfully sent transaction!`, {
        confirmedRound: result.confirmedRound,
        txIDs: result.txIDs,
      });
    } catch (error) {
      console.error(`[App] Error signing transaction: ${error}`);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  const handleLogin = useCallback(async () => {
    try {
      await wallets[0].connect(getConnectArgs(wallets[0]));
      const btn: HTMLElement | null = document.querySelector(".wallet-buttons");
      btn?.click();
      setIsConnected(true);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi kết nối ví:", error);
    }
  }, [wallets, navigate]);

  const memoizedWallets = useMemo(() => wallets.map((wallet) => (
    <div key={wallet.id} className="wallet-group">
      <div className="wallet-buttons flex flex-row gap-4">
        <button
          type="button"
          onClick={() => handleLogin()}
          disabled={isConnectDisabled(wallet)}
          className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
        >
          Connect
        </button>
        <button
          type="button"
          onClick={() => wallet.disconnect()}
          disabled={!wallet.isConnected}
          className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
        >
          Disconnect
        </button>
        {wallet.isActive ? (
          <button
            type="button"
            onClick={sendTransaction}
            disabled={isSending}
          >
            {isSending ? "Sending Transaction..." : "Send Transaction"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => wallet.setActive()}
            disabled={!wallet.isConnected}
            className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
          >
            Set Active
          </button>
        )}
      </div>

      {isMagicLink(wallet) && (
        <div className="input-group">
          <label htmlFor="magic-email">Email:</label>
          <input
            id="magic-email"
            type="email"
            value={magicEmail}
            onChange={(e) => setMagicEmail(e.target.value)}
            placeholder="Enter email to connect..."
            disabled={wallet.isConnected}
          />
        </div>
      )}

      {wallet.isActive && wallet.accounts.length > 0 && (
        <select onChange={(e) => setActiveAccount(e, wallet)}>
          {wallet.accounts.map((account) => (
            <option key={account.address} value={account.address}>
              {account.address}
            </option>
          ))}
        </select>
      )}
    </div>
  )), [wallets, magicEmail, isSending, isConnected]);

  const networkButtons = useMemo(() => (
    <div className="network-buttons flex flex-row gap-4">
      <button
        type="button"
        onClick={() => setActiveNetwork(NetworkId.BETANET)}
        disabled={activeNetwork === NetworkId.BETANET}
        className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
      >
        Set to Betanet
      </button>
      <button
        type="button"
        onClick={() => setActiveNetwork(NetworkId.TESTNET)}
        disabled={activeNetwork === NetworkId.TESTNET}
        className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
      >
        Set to Testnet
      </button>
      <button
        type="button"
        onClick={() => setActiveNetwork(NetworkId.MAINNET)}
        disabled={activeNetwork === NetworkId.MAINNET}
        className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
      >
        Set to Mainnet
      </button>
    </div>
  ), [activeNetwork, setActiveNetwork]);

  return (
    <>
      {/* <div className="flex h-full w-full flex-col items-center justify-center">
        <div>
          <div className="network-group h-full w-full text-center text-2xl">
            <h4 className="text-center text-white">
              Current Network:{" "}
              <span className="active-network text-center text-white">
                {activeNetwork}
              </span>
            </h4>
            {networkButtons}
          </div>

          {memoizedWallets}
        </div>
      </div> */}
      <div className="flex w-full flex-col items-center space-y-72">
        <img src="/banner.png" className="w-2/3" />
        <button
          className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
          onClick={handleLogin}
        >
          <span className="ml-1">Connect</span>
        </button>
      </div>
    </>
  );
};
