import { Injectable,Inject } from '@nestjs/common';
import { Cache} from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}
	async getHello() {
		const cacheData = await this.cacheManager.get('Greetings');
		console.log(cacheData);
		if (!cacheData)
			console.log(await this.cacheManager.set("Greetings", { 1: 'Namaste', 2: "Hello" }));
		else return cacheData;
		return 'Hello World!';
	}
}
 