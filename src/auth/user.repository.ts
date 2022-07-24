import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { errorMonitor } from "events";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository <User> {

	async createUser(authCredentialDto: AuthCredentialDto): Promise <void> {
		const { username, password } = authCredentialDto;

		const salt =  await bcrypt.genSalt();  // 암호 + salt 값으로 해싱
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({username, password:hashedPassword});

		try {
			await this.save(user);
		} catch (error) {  // username 중복 에러 catch
			if (error.code === '23505') {
				throw new ConflictException('Existing username');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}