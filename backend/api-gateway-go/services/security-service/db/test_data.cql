// Get facilities
MATCH (elibeams:Facility{ code: 'elibm' })
MATCH (alps:Facility{ code: 'elialps' })
// Get roles
MATCH (basicsRole:Role{ code: 'basics' })
MATCH (catalogueViewRole:Role{ code: 'catalogue-view' })

// Pavel Bakule
MERGE (pavelBakule:User{
  uid: '7cdab3e0-205c-4c14-bdbf-98cc436fe62e',
  username: 'pavel.bakule',
  firstName: 'Pavel',
  lastName: 'Bakule',
  email: 'pavel.bakule@eli-beams.eu',
  passwordHash: '$2a$12$qh1lcgwjErRBkU9hM1xfseDJ8friT6PNkOp6hAmKK1h4twC8fNxvK',
  isEnabled: true })
//assign facility
  MERGE (pavelBakule)-[:BELONGS_TO]->(elibeams)
//asign all roles
  MERGE (pavelBakule)-[:HAS_ROLE]->(basicsRole)
  MERGE (pavelBakule)-[:HAS_ROLE]->(catalogueViewRole)
  
// Balázs Erdöhelyi
  MERGE (balazsErdohelyi:User{
    uid: '7cdab3e0-205c-4c14-bdbf-98cc436fe62e',
    username: 'balazs.erdohelyi',
    firstName: 'Balázs',
    lastName: 'Erdöhelyi',
    email: 'balazs.erdohelyi@eli-alps.hu',
    passwordHash: '$2a$12$M70voBzjR7DMLMkazl2Re..8MfGtW6Rf5tU9kpawjdXQ0r6R1ichW',
    isEnabled: true })
//assign facility
    MERGE (balazsErdohelyi)-[:BELONGS_TO]->(alps)
//asign all roles
    MERGE (balazsErdohelyi)-[:HAS_ROLE]->(basicsRole)
    MERGE (balazsErdohelyi)-[:HAS_ROLE]->(catalogueViewRole);
