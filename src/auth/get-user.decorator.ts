import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

// req안에서 User정보만 가져올 수 있도록 하는 커스텀 데코레이터 생성
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
	const req = ctx.switchToHttp().getRequest();
	return req.user;
})