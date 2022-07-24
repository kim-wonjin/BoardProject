import { Board } from "src/boards/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username']) // 중복값이 애초에 들어갈 수 없도록
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	// 유저 테이블과 보드 테이블 간의 관계 설정
	// eager : true  => user를 가져올때 board도 같이 가져옴
	@OneToMany(type => Board, board => board.user, { eager : true })
	boards: Board[];  // one to many
}