import { CustomRepository } from "@/database/postgres"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "posts", comment: "Stores all user created posts" })
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    external_article_url: string

    @Column()
    featured_image_url: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    static repository() {
        return new CustomRepository(this)
    }
}

declare global {
    type IPost = InstanceType<typeof Post>;
}
