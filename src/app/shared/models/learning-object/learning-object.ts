import { User } from '../user';
import { General } from './general';
import { Lifecyle } from './lifecyle';
import { MetaMetadata } from './meta-metadata';
import { Technical } from './technical';
import { Educational } from './educational';
import { Rights } from './rights';
import { Relation } from './relation';
import { Annotation } from './annotation';
import { Classification } from './classification';

export interface LearningObject {
  accept: boolean;
  user: User;
  general: General;
  lifecycle: Lifecyle;
  metaMetadata: MetaMetadata;
  technical: Technical;
  educational: Educational[];
  rights: Rights;
  relation: Relation[];
  annotation: Annotation[];
  classification: Classification[];
}
