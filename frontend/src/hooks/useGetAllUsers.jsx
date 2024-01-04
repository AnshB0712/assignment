import { useEffect, useRef, useState } from "react";
import usePrivateAxios from "./usePrivateAxios";
import { isOnline } from "../utils/isOnline";

const useGetAllUsers = (deleteTimeStamp) => {
  const effectRan = useRef(true);
  const { customAxios } = usePrivateAxios();
  const [state, setState] = useState({
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isOnline()) {
        setState((p) => ({
          ...p,
          error: { message: "Please turn on Internet Your Connection" },
        }));
        return;
      }

      try {
        const { data } = await customAxios.get("/user/get");
        setState((p) => ({ ...p, data: data.data }));
      } catch (error) {
        console.log(error);
        setState((p) => ({ ...p, error }));
      }
    };

    if (effectRan.current || deleteTimeStamp) {
      fetchUsers();
    }

    return () => {
      effectRan.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteTimeStamp]);

  return state;
};

export default useGetAllUsers;
