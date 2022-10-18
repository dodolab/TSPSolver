
/**
 * Multiply-with-carry random generator
 * Taken from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 */
export default class Random {

	mW: number;
	mZ: number;
	mask = 0xffffffff;

	constructor(seed: number) {
		this.mW  = (123456789 + seed) & this.mask;
		this.mZ  = (987654321 - seed) & this.mask;
	
	}

	float() {
		this.mZ = (36969 * (this.mZ & 65535) + (this.mZ >> 16)) & this.mask;
		this.mW = (18000 * (this.mW & 65535) + (this.mW >> 16)) & this.mask;
		let result = ((this.mZ << 16) + (this.mW & 65535)) >>> 0;
		result /= 4294967296;
		return result;
	}


	int(min: number, max: number) {
		return min + Math.floor((max - min + 1) * this.float());
	}

}