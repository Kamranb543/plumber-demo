import { cookies } from "next/headers";
import PageClient from "./page-client";

export default async function Demo5Page() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("global-theme")?.value;
  
  // Default theme is lightmode (false)
  const isDarkModeDefault = theme === "dark";

  return <PageClient isDarkModeDefault={isDarkModeDefault} />;
}
