import { useEffect, useState } from "react";
import Connect, { type MonoSuccessData } from "@mono.co/connect.js";
import axiosClient from "../api/axios";

const monoURL: string = import.meta.env.VITE_MONO_PUBLIC_KEY;

const MonoComponent: React.FC = () => {
  const [monoInstance, setMonoInstance] = useState<any>(null);

  useEffect(() => {
    const mono = new Connect({
      key: monoURL,
      onSuccess: async (data: MonoSuccessData) => {
        await axiosClient.post("/expense/exchangeCode", {
          code: data.code,
        });
      },
      onClose: () => console.log("User closed the widget without connecting"),
    });

    mono.setup();

    setMonoInstance(mono);
  }, []);
  return (
    <div>
      <button onClick={() => monoInstance?.open()} className="cursor-pointer ">
        Link Bank Account
      </button>
    </div>
  );
};

export default MonoComponent;
