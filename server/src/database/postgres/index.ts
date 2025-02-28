import AppDataSource from "./data-source"

export { CustomRepository } from "./repository"

export const connect = async () => {
    await AppDataSource.initialize()
}

export const disconnect = async () => {
    await AppDataSource.destroy()
}

export const ping = async () => {
    await AppDataSource.query("SELECT 1")
}

export default AppDataSource