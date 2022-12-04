// Create two main facilities
MERGE (eli:Facility{ uid: '0338d3de-962a-4d06-a636-c1e744a00b38', name: 'ELI - Bemalines', code: 'elibm' })
MERGE (alps:Facility{ uid: '1bf54c11-b8bb-48b5-882d-ba433717a968', name: 'ELI - ALPS', code: 'elialps' })

// Create admin user
MERGE (admin:User{ uid: '71864520-9e86-427c-901c-0c220f951775', username: 'admin', fullName: 'Jiří Švácha', email: 'jiri.svacha@eli-beams.eu', passwordHash: '$2a$13$ifCe51bH2rvTlAH2F1DLnuyCdM.yHt.KhAASXXhjQeGVHYwy3RdSO' })

// Create basic role
MERGE (basicRole:Role{ uid: '0f356f0c-e78a-420f-965b-d23d93e26d12', name: 'basics', code: 'basics' })

// Add admin to basics role
MERGE (admin)-[:BELONGS_TO]->(basicRole);
