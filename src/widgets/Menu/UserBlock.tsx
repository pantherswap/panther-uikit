import React from "react";
import Button from "../../components/Button/Button";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";
import { MobileLoginButtonIcon } from "./icons";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
  isMobile?: boolean;
}

const UserBlock: React.FC<Props> = ({ account, login, logout, isMobile }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? isMobile ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <Button
          size="sm"
          onClick={() => {
            onPresentAccountModal();
          }}
          style={{marginRight: 8, background: "rgba(66, 117, 206, 0.4)"}}
        >
          {accountEllipsis}
        </Button>
      ) : isMobile ? 
      (
        <Button onClick={() => onPresentConnectModal()} style={{height: 32, marginRight: 16}}>
          <MobileLoginButtonIcon width="25px" />
        </Button>
      ) :
      (
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            onPresentConnectModal();
          }}
          style={{marginRight: 8, fontFamily: 'Mitr', fontSize: 14, fontWeight: 500}}
        >
          CONNECT
        </Button>
      )}
    </div>
  );
};

export default UserBlock;
