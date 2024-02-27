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
	export class outGetInsBackgroundPictureParam {
	    code: number;
	    msg: string;
	    images: string[];
	    imagesData: string[];
	
	    static createFrom(source: any = {}) {
	        return new outGetInsBackgroundPictureParam(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.msg = source["msg"];
	        this.images = source["images"];
	        this.imagesData = source["imagesData"];
	    }
	}
	export class outGetXhsBackgroundPictureParam {
	    code: number;
	    msg: string;
	    images: string[];
	    imagesData: string[];
	
	    static createFrom(source: any = {}) {
	        return new outGetXhsBackgroundPictureParam(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.msg = source["msg"];
	        this.images = source["images"];
	        this.imagesData = source["imagesData"];
	    }
	}

}

