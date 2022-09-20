export interface Ketcher {
    version: string;
    apiPath: string;
    buildDate: string;
    buildNumber?: string;
    getSmiles: () => string;
    saveSmiles: () => Promise<any>;
    getMolfile: () => string;
    setMolecule: (molString: string) => void;
    addFragment: (molString: string) => void;
    showMolfile: (clientArea: any, molString: any, options: any) => any;
}
