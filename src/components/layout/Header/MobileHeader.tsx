import { ContentCopy } from "@mui/icons-material";
import { shortenAddress } from "../../../utils/Shorten";
import { useContext, useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useWallet } from "@txnlab/use-wallet-react";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../../../contexts/AuthProvider";
// import { BiSolidCoinStack } from "react-icons/bi";
import { RiKey2Fill } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
// import { HiUserGroup } from "react-icons/hi";
import PlayerInfoModal from "./PlayerInforModal";
import { IoIosArrowBack } from "react-icons/io";
// import LeaderboardModal from "../../LeaderboarbModal/LeaderboardModal";

const MobileHeader = () => {
  const [openToolTip, setOpenToolTip] = useState(false);
  const [openPlayerModal, setPlayerModal] = useState(false);
  // const [openLeaderboardModal, setLeaderboardModal] = useState(false);
  const navigate = useNavigate();
  const { wallets, activeAddress } = useWallet();
  // const auth = useContext(AuthContext);

  useEffect(() => {
    if (!wallets[0].isConnected) {
      return;
    }
  }, [wallets[0].isConnected]);

  useEffect(() => {
    if (openToolTip) {
      setTimeout(() => {
        setOpenToolTip(false);
      }, 1000);
    }
  }, [openToolTip]);

  const handlePlayerInfoClose = () => {
    setPlayerModal(false);
  };

  // const handleLeaderboardClose = () => {
  //   setLeaderboardModal(false);
  // };
  const handleDisconnect = () => {
    wallets[0].disconnect();
  };

  return (
    <header className="flex w-full flex-row items-start justify-between px-4 py-4">
      <PlayerInfoModal
       open={openPlayerModal}
        handleClose={handlePlayerInfoClose}
        playerInfo={wallets[0]?.accounts[0]}
        disconnect={handleDisconnect}
      />
      {/* <LeaderboardModal
        open={openLeaderboardModal}
        handleClose={handleLeaderboardClose}
      /> */}

      <div className="flex flex-grow flex-col justify-start space-y-4">
        <div
          className="cursor-pointer text-3xl text-white"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoIosArrowBack />
        </div>
        <div className="flex w-fit items-center space-x-2 rounded-full bg-[#DDDDDD] px-4 py-1">
          <RiKey2Fill /> <p>0</p>
        </div>
        {/* <div className="flex w-fit items-center space-x-2 rounded-full bg-[#DDDDDD] px-4 py-1">
          <BiSolidCoinStack /> <p>1M</p>
        </div> */}
      </div>
      <div className="flex flex-1 flex-grow-[4] items-start justify-center">
        <h2 className="font-vt323 flex items-center rounded-full bg-[#DDDDDD]/20 px-5 py-1 text-white">
          <Tooltip
            open={openToolTip}
            onOpen={() => {
              setOpenToolTip(true);
            }}
            title="Copied!"
          >
            <div className="flex items-center space-x-2">
              <ContentCopy
                onClick={() => {
                  setOpenToolTip(true);
                  if (!activeAddress) return;
                  navigator.clipboard.writeText(activeAddress.toString());
                }}
                className="cursor-pointer !text-base"
              />
              <span className="text-lg">
                {activeAddress && shortenAddress(activeAddress.toString(), 5)}
              </span>
            </div>
          </Tooltip>
        </h2>
      </div>
      <div className="relative flex flex-grow flex-col items-end space-y-4 ps-4 text-3xl text-white">
        <button
          className="size-10 rounded-full"
          onClick={() => {
            setPlayerModal(true);
          }}
        >
          <img src="/gf.png" alt="" className="rounded-full" />
        </button>
        {/* <button>
          <HiUserGroup />
        </button> */}
        {/* <button
          onClick={() => {
            setLeaderboardModal(true);
          }}
        >
          <FaRankingStar />
        </button> */}
      </div>
    </header>
  );
};

export default MobileHeader;
