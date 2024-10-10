import { useEffect, useState, useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import AuthContext from "../../../contexts/AuthProvider";
import { useWallet } from "@txnlab/use-wallet-react";

const RequireAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    wallets,
  } = useWallet();
  const [progress, setProgress] = useState(0);
  // const auth = useContext(AuthContext);

  // useEffect(() => {
  //   if (isLoading) {
  //     const interval = setInterval(() => {
  //       setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  //     }, 120);

  //     return () => clearInterval(interval);
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  //   if (connected) {
  //     UpdateAccount(account?.address);
  //   }
  // }, [connected, account]);

  // const UpdateAccount = async (address: string | undefined) => {
  //   if (address) {
  //     try {
  //       if (!auth) return;

  //       const result = await auth.fetchPlayerInfo(address);

  //       if (!result) navigate("/create-account");
  //       await auth.fetchCreditInfor(address);
  //     } catch (error) {
  //       navigate("/create-account");
  //     }
  //   }
  // };

  const ProgressBar = () => (
    <div className="border-dark-300 w-[350px] border-2">
      <div className="m-1">
        <div
          style={{
            border: "1px solid black",
            width: `${progress}%`,
            height: "30px",
            backgroundColor: "white",
          }}
        ></div>
      </div>
    </div>
  );

  // if (isLoading && !connected) {
  //   return (
  //     <div className="flex h-screen flex-col items-center justify-center">
  //       <div className="m-2 text-xl text-white">Loading...</div>
  //       <ProgressBar />
  //     </div>
  //   );
  // }

  // return connected ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/auth/login" state={{ from: location }} replace />
  // );
  return wallets[0].isConnected ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;
