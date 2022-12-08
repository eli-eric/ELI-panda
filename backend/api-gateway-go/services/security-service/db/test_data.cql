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
  passwordHash: '$2a$12$gD7qBBCqjPhNqrrXMs0Gt./AVMFuBrnBipSCGWziKcca/mcukFtzu',
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
    passwordHash: '$2a$12$oqPyv/83rDaqwk47Hb.UTeiw1MmMBxIevXz1/JdwIiQBdYl/SyY/2',
    isEnabled: true })
//assign facility
    MERGE (balazsErdohelyi)-[:BELONGS_TO]->(alps)
//asign all roles
    MERGE (balazsErdohelyi)-[:HAS_ROLE]->(basicsRole)
    MERGE (balazsErdohelyi)-[:HAS_ROLE]->(catalogueViewRole);
