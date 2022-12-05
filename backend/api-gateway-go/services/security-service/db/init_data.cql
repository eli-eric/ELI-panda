// Create two main facilities
MERGE (eli:Facility{ uid: '0338d3de-962a-4d06-a636-c1e744a00b38', name: 'ELI - Bemalines', code: 'elibm' })
MERGE (alps:Facility{ uid: '1bf54c11-b8bb-48b5-882d-ba433717a968', name: 'ELI - ALPS', code: 'elialps' })

// Create admin user
MERGE (admin:User{
  uid: '71864520-9e86-427c-901c-0c220f951775',
  username: 'admin',
  firstName: 'Jiří',
  lastName: 'Švácha',
  email: 'jiri.svacha@eli-beams.eu',
  passwordHash: '$2a$13$ifCe51bH2rvTlAH2F1DLnuyCdM.yHt.KhAASXXhjQeGVHYwy3RdSO',
  isEnabled: true })
  
// Create basic role
  MERGE (basicRole:Role{ uid: '0f356f0c-e78a-420f-965b-d23d93e26d12', name: 'Basic access', code: 'basics' })
  
// Add admin to basics role
  MERGE (admin)-[:HAS_ROLE]->(basicRole)
  
// Catalogue data
  MERGE (catalogueViewRole:Role{ uid: '21348c0f-ee17-4480-be71-b9903075e678', name: 'Catalogue - view', code: 'catalogue-view' })
  MERGE (admin)-[:HAS_ROLE]->(catalogueViewRole);
