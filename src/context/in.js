import Dexie from 'dexie';

class InjuryDatabase extends Dexie {
  constructor() {
    super('InjuryDatabase');
    
    this.version(1).stores({
      patients: '++id, firstName, lastName, dateOfBirth, mrn',
      injuries: '++id, patientId, dateRecorded, bodyLocation, severity, status',
      images: '++id, injuryId, imageData, dateCaptured, type',
      triageData: '++id, injuryId, vitalSigns, painLevel, treatmentPriority, notes',
      treatments: '++id, injuryId, dateAdministered, type, provider, notes'
    });

    // Define relationships
    this.injuries.mapToClass(Injury);
    this.images.mapToClass(InjuryImage);
    this.triageData.mapToClass(TriageData);
  }
}

class Injury {
  constructor(data) {
    this.patientId = data.patientId;
    this.dateRecorded = new Date();
    this.bodyLocation = data.bodyLocation;
    this.severity = data.severity; // 1-5 scale
    this.status = data.status; // 'new', 'treating', 'resolved'
  }

  async getImages() {
    return await db.images.where('injuryId').equals(this.id).toArray();
  }

  async getTriageData() {
    return await db.triageData.where('injuryId').equals(this.id).first();
  }
}

class InjuryImage {
  constructor(data) {
    this.injuryId = data.injuryId;
    this.imageData = data.imageData; // Base64 encoded string
    this.dateCaptured = new Date();
    this.type = data.type; // 'initial', 'progress', 'final'
  }
}

class TriageData {
  constructor(data) {
    this.injuryId = data.injuryId;
    this.vitalSigns = {
      bloodPressure: data.vitalSigns.bloodPressure,
      heartRate: data.vitalSigns.heartRate,
      respiratoryRate: data.vitalSigns.respiratoryRate,
      temperature: data.vitalSigns.temperature,
      oxygenSaturation: data.vitalSigns.oxygenSaturation
    };
    this.painLevel = data.painLevel; // 0-10 scale
    this.treatmentPriority = data.treatmentPriority; // 'immediate', 'urgent', 'delayed', 'minimal'
    this.notes = data.notes;
  }
}

const triageDb = new InjuryDatabase();

export default triageDb;