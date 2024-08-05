import { useSession } from "next-auth/react";

export default function GetSession() {
  const { data: session, status } = useSession();
  
  return { session, status };
}

