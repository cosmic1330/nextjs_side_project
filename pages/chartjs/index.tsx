import BollingChart from "./charts/bollingChart";
import { useRouter } from "next/router";

export default function TestChart() {
  const router = useRouter();
  return (
    <div>
      <BollingChart {...{ router }} />
    </div>
  );
}
