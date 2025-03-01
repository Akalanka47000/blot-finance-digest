import { authService } from "@/services"
import { headers } from "@shared/constants"
import { cookies } from "next/headers"

export const getCurrentUser = async () => {
    try {
        const response = await authService.current({
            options: {
                headers: {
                    [headers.cookie]: cookies().toString()
                }
            }
        })
        return response.data?.data
    } catch (e) {
        return null;
    }
}