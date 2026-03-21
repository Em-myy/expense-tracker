import { useEffect, useState } from "react";
import Connect, { type MonoSuccessData } from "@mono.co/connect.js";
import axiosClient from "../api/axios";

const monoURL: string = import.meta.env.VITE_MONO_PUBLIC_KEY;

const MonoComponent: React.FC = () => {
  const [monoInstance, setMonoInstance] = useState<any>(null);
  const [linked, setLinked] = useState<boolean>(false);

  useEffect(() => {
    const mono = new Connect({
      key: monoURL,

      onSuccess: async (data: MonoSuccessData) => {
        await axiosClient.post("/expense/exchangeCode", {
          code: data.code,
        });
        setLinked(true);
      },

      onClose: () => console.log("User closed the widget without connecting"),
    });

    mono.setup();

    setMonoInstance(mono);

    return () => {
      mono.close();
    };
  }, []);

  if (linked) {
    return (
      <p className="text-green-400 text-sm font-semibold">
        Bank account linked ✓
      </p>
    );
  }
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
