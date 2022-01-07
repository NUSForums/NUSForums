import { writeBatch, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Module } from '../types/modules';

// DO NOT USE
export const syncModules = () => {
  return getDoc(doc(db, 'metadata', 'current'))
    .then((doc) => doc.data())
    .then((metadata) => {
      const acadYear = metadata?.acadYear || '2021-2022';
      return fetch(`https://api.nusmods.com/v2/${acadYear}/moduleInfo.json`).then(
        (res) => res.json() as Promise<Module[]>
      );
    })
    .then((modules) => {
      let batch = writeBatch(db);
      let i = 0
      modules.forEach((mod) => {
        const moduleRef = doc(db, "modules", mod.moduleCode);
        console.log('Sync', mod.moduleCode)
        const moduleData = {
          code: mod.moduleCode,
          title: mod.title,
          department: mod.department,
          faculty: mod.faculty,
          semesters: mod.semesterData.map((x) => x.semester),
        };
        i++;
        batch.set(moduleRef, moduleData);
        if (i % 500 === 0) {
          batch.commit();
          batch = writeBatch(db);
        }
      });
      return batch.commit();
    });
};
