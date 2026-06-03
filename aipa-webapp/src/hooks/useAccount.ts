import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  getUserInfoAction,
  getUserActivityAction,
  getUserSessionsAction,
  editUsernameAction,
  terminateUserSessionsAction,
} from "../store/slices/userSlice";

export const useAccount = () => {
  const dispatch = useDispatch<any>();

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userActivity = useSelector((state: RootState) => state.user.userActivity);
  const userSessions = useSelector((state: RootState) => state.user.userSessions);
  const isTelegram = useSelector((state: RootState) => state.user.isTelegram);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  // Modal open states
  const [isEditNicknameOpen, setIsEditNicknameOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isSessionsOpen, setIsSessionsOpen] = useState(false);
  const [isTelegramBotOpen, setIsTelegramBotOpen] = useState(false);

  // Field states
  const [nicknameInput, setNicknameInput] = useState("");

  useEffect(() => {
    dispatch(getUserInfoAction());
    dispatch(getUserActivityAction());
    dispatch(getUserSessionsAction());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setNicknameInput(userInfo.username);
    }
  }, [userInfo]);

  const handleEditNicknameSubmit = async () => {
    if (nicknameInput.trim() !== "" && nicknameInput !== userInfo?.username) {
      await dispatch(editUsernameAction(nicknameInput));
      setIsEditNicknameOpen(false);
    }
  };

  const handleTerminateSession = async (sessionId: string | number, device: string, isCurrentIp: boolean) => {
    await dispatch(terminateUserSessionsAction({ id: sessionId, device, isCurrentIp }));
  };

  return {
    userInfo,
    userActivity,
    userSessions,
    isTelegram,
    isLoading,
    isEditNicknameOpen,
    setIsEditNicknameOpen,
    isActivityOpen,
    setIsActivityOpen,
    isSessionsOpen,
    setIsSessionsOpen,
    isTelegramBotOpen,
    setIsTelegramBotOpen,
    nicknameInput,
    setNicknameInput,
    handleEditNicknameSubmit,
    handleTerminateSession,
  };
};
