import axios from 'axios'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADProvider from 'next-auth/providers/azure-ad'
import getDriver from '@/utils/neo4j'

var jwt = require('jsonwebtoken')

export const authOptions = {
    session: {
        jwt: true,
    },
    providers: [
        AzureADProvider({
            id: 'azure-ad-beamlines',
            clientId: process.env.AZURE_AD_BEAMLINES_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_BEAMLINES_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_BEAMLINES_TENANT_ID,
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const result = await axios({
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'post',
                    url: process.env.PANDA_API_GW_URL + '/authenticate',
                    data: {
                        username: credentials?.username,
                        password: credentials?.password,
                    },
                }).catch(error => {
                    //catching erros
                    console.log(error)
                    if (error.response) {
                        if (error.request.res.statusCode === 401) {
                            throw new Error('Wrong password or user name')
                        } else {
                            throw new Error(error.response.data)
                        }
                    }
                })
                return result.data
            },
        }),
    ],
    pages: {
        signIn: '/',
        error: '/',
    },
    callbacks: {
        async jwt(params) {
            const providerId = params?.account?.provider

            if (providerId === 'azure-ad-beamlines') {
                let names = params.user.name.split(' ')
                let firstName = ''
                let lastName = ''

                if (names.length === 1) {
                    firstName = names[0]
                } else if (names.length === 2) {
                    firstName = names[1]
                    lastName = names[0]
                }

                const user = await neo4GetOrCreateUser(params.user.email, firstName, lastName)
                const apiAccessToken = jwt.sign(
                    {
                        sub: user.uid,
                        jti: user.email,
                        exp: Date.now() + 1000 * 60 * 60 * 24 * 365,
                        facilityName: user.facilityName,
                        facilityCode: user.facilityCode,
                        roles: user.roles,
                    },
                    process.env.NEXTAUTH_SECRET,
                )
                // Return only necessary fields to keep session token small
                // (avoids storing Azure AD profile/claims bloat that causes 431 errors)
                return {
                    sub: user.uid,
                    iat: params.token.iat,
                    exp: params.token.exp,
                    jti: params.token.jti,
                    roles: user.roles,
                    apiAccessToken,
                    facility: user.facilityName,
                    facilityCode: user.facilityCode,
                    uid: user.uid,
                    fullName: user.firstName + ' ' + user.lastName,
                }
            }

            if (params.user?.roles) {
                // Credentials flow - return only necessary fields
                return {
                    sub: params.token.sub,
                    iat: params.token.iat,
                    exp: params.token.exp,
                    jti: params.token.jti,
                    roles: params.user.roles,
                    apiAccessToken: params.user.accessToken,
                    facility: params.user.facility,
                    facilityCode: params.user.facilityCode,
                    uid: params.user.uid,
                    fullName: params.user.firstName + ' ' + params.user.lastName,
                }
            }

            return params.token
        },
        async session(params) {
            params.session.user.roles = params.token.roles
            params.session.user.apiAccessToken = params.token.apiAccessToken
            params.session.user.facilityCode = params.token.facilityCode
            params.session.user.facility = params.token.facility
            params.session.user.uid = params.token.uid
            params.session.user.fullName = params.token.fullName

            return params.session
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
}

export default NextAuth(authOptions)

const neo4GetOrCreateUser = async (email, firstName, lastName) => {
    const driver = getDriver()
    const session = driver.session()
    let transaction
    try {
        transaction = session.beginTransaction()
        const usersQuery = `MATCH(f:Facility{code:"B"})
OPTIONAL MATCH(u:User) WHERE TOLOWER(u.email) =$email
CALL apoc.do.when(
u IS NULL,
'CREATE(newUsr:User{uid: apoc.create.uuid(), email: $email, username: $email, firstName: $firstName, lastName: $lastName ,isEnabled: true, createdAt: datetime(), createdBy: "autocreated"}) MERGE(newUsr)-[:BELONGS_TO_FACILITY]->(f) RETURN newUsr as user',
'RETURN u as user', {u:u, f:f, email:$email, firstName:$firstName, lastName:$lastName}
)
YIELD value
WITH value.user as user, f
OPTIONAL MATCH(empl:Employee) WHERE TOLOWER(empl.email) =$email
CALL apoc.do.when(
empl IS NOT NULL,
'MERGE(empl)-[:HAS_USER]->(u) RETURN empl, u',
'', {u:user, empl:empl, email:$email}
)
YIELD value
WITH user, f
OPTIONAL MATCH(user)-[:HAS_ROLE]->(roles:Role)
CALL apoc.do.when(
roles IS NULL,
'MATCH(roles:Role) WHERE roles.code in ["basics", "catalogue-view", "systems-view", "room-cards-view", "orders-view"] MERGE(u)-[:HAS_ROLE]->(roles) return roles',
'RETURN r as roles', {u:user, r:roles}
)
YIELD value
WITH user, collect(value.roles.code) as roles, f
RETURN DISTINCT { uid: user.uid, email: user.email, firstName: user.firstName, lastName: user.lastName, facilityName: f.name, facilityCode: f.code, roles: roles  } as user;`

        const result = await transaction.run(usersQuery, {
            email,
            firstName,
            lastName,
        })

        await transaction.commit()
        return result.records[0].get('user')
    } catch (e) {
        console.log('🚀 ~ neo4GetOrCreateUser ~ e:', e)
        if (transaction) {
            await transaction.rollback()
        }
        throw new Error(e)
    } finally {
        await session.close()
    }
}
