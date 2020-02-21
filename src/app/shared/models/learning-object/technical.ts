export interface Technical {
  format: string[];
  size: number;
  location: string[];
  requeriment: [{
    orComposite: [{
      type: string;
      name: string;
      minimumVersion: string;
      maximumVersion: string;
    }];
  }];
  installationRemarks: {
    language: string;
    content: string;
  };
  otherPlatformRequeriments: {
    language: string;
    content: string;
  };
  duration: Date;
}
