export interface VirtualMachine {
	id?: number;
	vmName: string;
	ip: string;
	dnsName: string;
	project?: string;
	environment?: string;
	status: string;
	comment?: string;
	reservedFrom?: Date;
	reservedTo?: Date;
	operatingSystem?: string;
	cpuCores?: number;
	ram?: number;
	disk?: number;
	createdAt?: Date;
	updatedAt?: Date;
}
