// import { useEffect } from "react";
// import { WalletSelector as AntdWalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { useNavigate } from "react-router-dom";

// export const LoginPage = () => {
//   const { connected, account } = useWallet();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (connected) {
//       navigate("/");
//     }
//   }, [connected]);

//   const handleLogin = () => {
//     const btn: HTMLElement | null = document.querySelector(".wallet-button");
//     btn?.click();
//   };

//   return (
//     <>
//       <div className="hidden">
//         <AntdWalletSelector />
//       </div>
//       <div className="flex w-full flex-col items-center space-y-72">
//         <img
//           src="/banner.png"
//           className="w-2/3"
//         />
//         <button
//           className="inline-flex items-center rounded-lg bg-white px-8 py-2 text-center text-2xl font-medium text-black shadow-sm shadow-white"
//           onClick={handleLogin}
//         >
//           <span className="ml-1">Connect</span>
//         </button>
//       </div>
//     </>
//   );
// };