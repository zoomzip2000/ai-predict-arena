import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  getUserInfoAction,
  getUserBalanceAction,
} from "../store/slices/userSlice";
import {
  checkTwoFAEnabledAction,
  toggleIsTwoFAEnabled,
} from "../store/slices/googleTwoFASlice";
import {
  getDepositWithdrawPermissionsMethod,
  withdrawFundsMethod,
  PermissionsResponse,
} from "../api/wallet";
import {
  turnOnTwoFAMethod,
  validate2FACodeMethod,
} from "../api/google2FA";

export const useWithdrawal = (initialFrom?: string, initialType?: string) => {
  const dispatch = useDispatch<any>();

  const authToken = useSelector((state: RootState) => state.main.token);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isTwoFAEnabled = useSelector((state: RootState) => state.googleTwoFA.isTwoFAEnabled);

  // Active view state
  const [activeTab, setActiveTab] = useState<"deposit" | "withdrawal">("deposit");
  const [permissions, setPermissions] = useState<Partial<PermissionsResponse>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isTwoFactorInfoModalOpen, setIsTwoFactorInfoModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isSuccessDepositModalOpen, setIsSuccessDepositModalOpen] = useState(false);

  const [isWithdrawUsdtModalOpen, setIsWithdrawUsdtModalOpen] = useState(false);
  const [isWithdrawConfirmModalOpen, setIsWithdrawConfirmModalOpen] = useState(false);
  const [isPinCodeModalOpen, setIsPinCodeModalOpen] = useState(false);
  const [isWithdrawSuccessModalOpen, setIsWithdrawSuccessModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  // Fields state
  const [withdrawAmountValue, setWithdrawAmountValue] = useState("");
  const [withdrawAddressValue, setWithdrawAddressValue] = useState("");
  const [code, setCode] = useState("");
  const [popupType, setPopupType] = useState("");

  useEffect(() => {
    if (userInfo && userInfo.balance > 0) {
      dispatch(checkTwoFAEnabledAction());
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    // Fetch permissions on mount
    const fetchPermissions = async () => {
      try {
        setIsLoading(true);
        const res = await getDepositWithdrawPermissionsMethod();
        if (res.status === 200 || res.status === 201) {
          setPermissions(res.data);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  // Handle redirect from URL query parameters if needed
  useEffect(() => {
    if (initialFrom === "p2pDeposit") {
      handleDepositOpen();
    } else if (initialFrom === "p2pWithdrawal") {
      handleWithdrawOpen();
    }
  }, [initialFrom]);

  const handleDepositOpen = () => {
    if (userInfo) {
      setIsDepositModalOpen(true);
    }
  };

  const handleWithdrawOpen = () => {
    setIsWithdrawUsdtModalOpen(true);
  };

  const tetherDepositModalBtnHandler = () => {
    setIsDepositModalOpen(false);
    if (userInfo?.twoFactorEnabled) {
      setIsSuccessDepositModalOpen(true);
    } else {
      setIsTwoFactorInfoModalOpen(true);
    }
  };

  const exchangerDepositBtnHandler = () => {
    if (userInfo?.twoFactorEnabled) {
      setIsSuccessDepositModalOpen(true);
    } else {
      setIsTwoFactorInfoModalOpen(true);
    }
  };

  const withdrawModalBtnHandler = () => {
    setIsWithdrawConfirmModalOpen(true);
  };

  const exchangerWithdrawBtnHandler = () => {
    setIsWithdrawConfirmModalOpen(true);
  };

  const confirmWithdrawModalBtnHandler = () => {
    setIsWithdrawConfirmModalOpen(false);
    if (userInfo?.twoFactorEnabled) {
      setIsPinCodeModalOpen(true);
    } else {
      setIsTwoFactorInfoModalOpen(true);
    }
  };

  const twoFactorInfoModalBtnHandler = () => {
    setIsTwoFactorInfoModalOpen(false);
    setIsTwoFactorModalOpen(true);
  };

  const handleWithdrawOrDepositLogic = async (authCode: string) => {
    if (activeTab === "withdrawal") {
      try {
        setIsLoading(true);
        const formatDateTimeForWithdraw = (date: Date) => {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${day}-${month}-${year} ${hours}:${minutes}`;
        };

        const res = await withdrawFundsMethod({
          userAddress: withdrawAddressValue,
          amount: Number(withdrawAmountValue),
          withdrawTime: formatDateTimeForWithdraw(new Date()),
          code: authCode,
        });

        if (res?.status === 200 || res?.status === 201) {
          setIsWithdrawSuccessModalOpen(true);
        }
      } catch (error: any) {
        console.error("Withdraw funds error:", error);
        if (error?.response?.data?.errorMessages?.[0] === "Insufficient funds") {
          setPopupType("notEnough");
          setIsWarningModalOpen(true);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsSuccessDepositModalOpen(true);
    }
  };

  const twoFactorModalBtnHandler = async (authCode: string) => {
    try {
      setIsLoading(true);
      const { status } = await turnOnTwoFAMethod(authCode);
      if (status === 200 || status === 201) {
        dispatch(toggleIsTwoFAEnabled(true));
        dispatch(getUserInfoAction());
        setIsTwoFactorModalOpen(false);

        if (activeTab === "withdrawal") {
          setIsPinCodeModalOpen(true);
        } else {
          setIsSuccessDepositModalOpen(true);
        }
      }
    } catch (e) {
      console.error("Turn on 2FA error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const pinCodePopupSubmitHandler = async (authCode: string) => {
    try {
      setIsLoading(true);
      const res = await validate2FACodeMethod(authCode);
      if (res.status === 200 && res.data === true) {
        setIsPinCodeModalOpen(false);
        if (activeTab === "withdrawal") {
          await handleWithdrawOrDepositLogic(authCode);
        } else {
          setCode(authCode);
          setIsDepositModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Validate 2FA code error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authToken,
    userInfo,
    isTwoFAEnabled,
    activeTab,
    setActiveTab,
    permissions,
    isLoading,
    setIsLoading,
    isDepositModalOpen,
    setIsDepositModalOpen,
    isTwoFactorInfoModalOpen,
    setIsTwoFactorInfoModalOpen,
    isTwoFactorModalOpen,
    setIsTwoFactorModalOpen,
    isSuccessDepositModalOpen,
    setIsSuccessDepositModalOpen,
    isWithdrawUsdtModalOpen,
    setIsWithdrawUsdtModalOpen,
    isWithdrawConfirmModalOpen,
    setIsWithdrawConfirmModalOpen,
    isPinCodeModalOpen,
    setIsPinCodeModalOpen,
    isWithdrawSuccessModalOpen,
    setIsWithdrawSuccessModalOpen,
    isWarningModalOpen,
    setIsWarningModalOpen,
    withdrawAmountValue,
    setWithdrawAmountValue,
    withdrawAddressValue,
    setWithdrawAddressValue,
    code,
    popupType,
    setPopupType,
    handleDepositOpen,
    handleWithdrawOpen,
    tetherDepositModalBtnHandler,
    exchangerDepositBtnHandler,
    withdrawModalBtnHandler,
    exchangerWithdrawBtnHandler,
    confirmWithdrawModalBtnHandler,
    twoFactorInfoModalBtnHandler,
    twoFactorModalBtnHandler,
    pinCodePopupSubmitHandler,
    handleWithdrawOrDepositLogic,
  };
};
