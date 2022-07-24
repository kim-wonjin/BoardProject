import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";  // ****
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable() // 어디에서나 주입 가능
export class JwtStrategy extends PassportStrategy(Strategy) {  // 기본 전략으로 jwt를 사용
	
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository) {
			super({
				secretOrKey: 'Secret1234',
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
			})	
		}

		async validate(payload) {
			const {username} = payload;
			const user : User = await this.userRepository.findOne({username});

			if (!user) {
				throw new UnauthorizedException();
			}

			return user;
		}
}
	