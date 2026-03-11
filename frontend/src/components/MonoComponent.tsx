import { useEffect, useState } from "react";
import Connect from "@mono.co/connect.js";

const monoURL: string = import.meta.env.MONO_PUBLIC_KEY;

const MonoComponent: React.FC = () => {
  const [monoInstance, setMonoInstance] = useState<any>(null);

  useEffect(() => {
    const mono = new Connect({
      key: monoURL,
      omohhhh,
    });
  }, []);
  return <div>MonoComponent</div>;
};

export default MonoComponent;
