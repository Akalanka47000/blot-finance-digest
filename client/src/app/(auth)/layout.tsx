import { ROUTE_HOME } from "@/constants";
import { getCurrentUser } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser();

    if (currentUser) {
        return redirect(ROUTE_HOME);
    }

    return children;
}