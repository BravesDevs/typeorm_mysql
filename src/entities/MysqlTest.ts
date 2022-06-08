import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("mysql_test_id_uindex", ["id"], { unique: true })
@Entity("mysql_test")
export class MysqlTest {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 500 })
  name: string | null;

  @Column("text", { name: "Summary", nullable: true })
  summary: string | null;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
