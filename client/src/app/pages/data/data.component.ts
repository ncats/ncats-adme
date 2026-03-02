import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DataEndpoint {
  name: string;
  training: number;
  public: number;
  assayId: string;
  assayUrl: string;
  downloadUrl: string;
}

@Component({
  selector: 'adme-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {
  endpoints: DataEndpoint[] = [
    { name: 'RLM Stability', training: 35019, public: 2525, assayId: 'AID 1508591', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1508591', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1508591_datatable_all.csv' },
    { name: 'PAMPA pH 5', training: 5227, public: 486, assayId: 'AID 1645871', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1645871', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645871_datatable_all.csv' },
    { name: 'PAMPA pH 7.4', training: 26093, public: 2528, assayId: 'AID 1508612', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1508612', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1508612_datatable_all.csv' },
    { name: 'Solubility', training: 36171, public: 2529, assayId: 'AID 1645848', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1645848', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645848_datatable_all.csv' },
    { name: 'HLC Stability', training: 1214, public: 189, assayId: 'AID 1508603', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1508603', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1508603_datatable_all.csv' },
    { name: 'CYP2D6', training: 5094, public: 5094, assayId: 'AID 1645840', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1645840', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645840_datatable_all.csv' },
    { name: 'CYP3A4', training: 5094, public: 5094, assayId: 'AID 1645841', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1645841', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645841_datatable_all.csv' },
    { name: 'CYP2C9', training: 5094, public: 5094, assayId: 'AID 1645842', assayUrl: 'https://pubchem.ncbi.nlm.nih.gov/bioassay/1645842', downloadUrl: 'https://opendata.ncats.nih.gov/public/adme/data/public_datasets/AID_1645842_datatable_all.csv' }
  ];
}

