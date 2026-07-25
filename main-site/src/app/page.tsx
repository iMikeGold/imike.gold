import { GatewayBillboard } from "@/components/gateway/GatewayBillboard";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return <GatewayBillboard />;
}
