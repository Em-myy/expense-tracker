import { useEffect, useState } from "react";
import Connect, { type MonoSuccessData } from "@mono.co/connect.js";
import axiosClient from "../api/axios";

const monoURL: string = import.meta.env.VITE_MONO_PUBLIC_KEY;

interface MonoComponentProps {
  onLinked?: () => void;
}

const MonoComponent: React.FC<MonoComponentProps> = ({ onLinked }) => {
  const [monoInstance, setMonoInstance] = useState<any>(null);

  useEffect(() => {
    const mono = new Connect({
      key: monoURL,

      onSuccess: async (data: MonoSuccessData) => {
        await axiosClient.post("/expense/exchangeCode", {
          code: data.code,
        });
        onLinked?.();
      },

      onClose: () => console.log("User closed the widget without connecting"),
    });

    mono.setup();

    setMonoInstance(mono);

    return () => {
      mono.close();
    };
  }, []);

  return (
    <div>
      <button
        onClick={() => monoInstance?.open()}
        className="cursor-pointer glow-btn px-4 py-2 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm"
      >
        Link bank account
      </button>
    </div>
  );
};

export default MonoComponent;
