export namespace main {
	
	export class CardIDSettings {
	    id: number;
	    customId: string;
	
	    static createFrom(source: any = {}) {
	        return new CardIDSettings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.customId = source["customId"];
	    }
	}

}

