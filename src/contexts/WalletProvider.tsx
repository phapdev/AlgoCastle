import {
  NetworkId,
  WalletId,
  WalletManager,
  WalletProvider as TxnWalletProvider,
} from "@txnlab/use-wallet-react";
import { PropsWithChildren } from "react";

const walletManager = new WalletManager({
  wallets: [WalletId.PERA],
  network: NetworkId.TESTNET,
});

export const WalletProvider = ({ children }: PropsWithChildren) => {
  return (
    <TxnWalletProvider manager={walletManager}>{children}</TxnWalletProvider>
  );
};
