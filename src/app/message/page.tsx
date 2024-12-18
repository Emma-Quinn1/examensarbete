"use client";

import MessageWindow from "@/components/MessageWindow";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");
  const recipientName = searchParams.get("recipientName");

  if (!recipientId || !recipientName) {
    return <p>Mottagarens ID eller namn saknas.</p>;
  }

  return (
    <MessageWindow recipientId={recipientId} recipientName={recipientName} />
  );
}
