import { Ekmap } from '../Ekmap';

export class Credential {
    constructor(value, name) {
        this.value = value ? value : "";

        this.name = name ? name : "token";
        this.CLASS_NAME = "Ekmap.Credential";
    }

    getUrlParameters() {
        return this.name + "=" + this.value;
    }

    getValue() {
        return this.value;
    }

    destroy() {
        this.value = null;
        this.name = null;
    }

}
Credential.CREDENTIAL = null;
Ekmap.Credential = Credential;