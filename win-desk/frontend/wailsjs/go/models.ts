export namespace service {
	
	export class RenameInfo {
	    filePath: string;
	    rename: string;
	    outPutDirectoryPath: string;
	
	    static createFrom(source: any = {}) {
	        return new RenameInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.filePath = source["filePath"];
	        this.rename = source["rename"];
	        this.outPutDirectoryPath = source["outPutDirectoryPath"];
	    }
	}
	export class Response {
	    code: number;
	    msg: string;
	
	    static createFrom(source: any = {}) {
	        return new Response(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.msg = source["msg"];
	    }
	}

}

