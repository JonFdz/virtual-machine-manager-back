export interface VirtualMachine {
	id?: number;
	vmName: string;
	ip: string;
	dnsName: string;
	project?: string;
	environment?: string;
	status: string;
	comment?: string;
	reservedUserName?: string;
	reservedFrom?: Date;
	reservedTo?: Date;
	operatingSystem?: string;
	cpuCores?: number;
	gpu?: string;
	ram?: number;
	disk?: number;
	createdAt?: Date;
	updatedAt?: Date;
}
