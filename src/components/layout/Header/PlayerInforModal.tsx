import React from "react";
import { Modal, Button } from "@mui/material";
// import { PlayerInfo } from "../../../type/type";
import { RiLogoutBoxRFill } from "react-icons/ri";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface PlayerInfo {
  address: string;
  name: string;
}

interface PlayerInfoModalProps {
  open: boolean;
  handleClose: () => void;
  playerInfo: PlayerInfo | undefined;
  disconnect: () => void;
}

const PlayerInfoModal: React.FC<PlayerInfoModalProps> = ({
  open,
  handleClose,
  playerInfo,
  disconnect,
}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <div className="flex w-3/4 flex-col rounded-lg bg-[#222222] p-6 text-white">
        <div className="flex flex-row items-center space-x-4 border-b pb-5">
          <div className="size-10 rounded-full border-2">
            <img src="/gf.png" alt="" className="rounded-full" />
          </div>
          <span>
            <p className="text-xl font-semibold leading-tight">
              {playerInfo?.name}
            </p>
            <p>@{playerInfo?.name}</p>
          </span>
        </div>
        <button
          className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg bg-mainColor py-2 text-black"
          onClick={disconnect}
        >
          <p>Sign Out</p>
          <RiLogoutBoxRFill />
        </button>
      </div>
    </Modal>
  );
};

export default PlayerInfoModal;
