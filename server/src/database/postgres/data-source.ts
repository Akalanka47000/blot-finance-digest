import "reflect-metadata"
import { DataSource } from "typeorm"
import { default as config } from "@/config"
import { User } from "../../modules/users/models"
import { Post } from "../../modules/posts/models"

const AppDataSource = new DataSource({
    type: "postgres",
    url: config.DB_URL,
    synchronize: false,
    logging: true,
    entities: [User, Post],
    migrations: [
        "./src/database/postgres/migrations/*.ts"
    ],
})

export default AppDataSource