require('dotenv').config()
const LDAP = require('ldap-client')
const logger = require('../../logger')

const base = process.env.LDAP_BASE

var ldap = new LDAP({
    uri:             process.env.LDAP_URI,              // string
    validatecert:    process.env.VALIDATE_CERTIFICATE,  // seconds, default is -1 (infinite timeout), connect timeout
    base:            process.env.LDAP_BASE,             // default base for all future searches
    attrs:           '*',                               // default attribute list for future searches
    filter:          '(objectClass=*)',                 // default filter for all future searches
    scope:           LDAP.SUBTREE,                      // default scope for all future searches
    connect:         () => {
        logger.info("Connected")
    }
}, function(err) {
    if(err){
        logger.error(err.message)
    }
});

const search = async (name, password, section, year) => {
    return await new Promise((resolve, reject) => {
        ldap.bind({
            binddn: `cn=${name}, ou=${section}${year}, ou=${section}, ou=Etudiants,ou=Comptes,${base}`,
            password: password
        }, (err) => {
            if(err) {
                reject(err)
            } else {
                const search_options = {
                    base: `cn=${name}, ou=${section}${year}, ou=${section}, ou=Etudiants,ou=Comptes,${base}`,
                    scope: LDAP.SUBTREE,
                    filter: '(objectClass=*)',
                    attrs: '*'
                }
                ldap.search(search_options, (err, data) => {
                    if(err) return reject(err)
                    return resolve(data)
                });
            }
        })
    })
}

module.exports.search = search