import { cookies } from "next/headers";
import LayoutClient from "./layout-client";

export default async function Demo2Layout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("global-theme")?.value;
  
  // Default theme is lightmode (false)
  const isDarkModeDefault = theme === "dark";

  return (
    <LayoutClient isDarkModeDefault={isDarkModeDefault}>
      {children}
    </LayoutClient>
  );
}
