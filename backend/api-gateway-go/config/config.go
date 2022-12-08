package config

// tag::import[]
import (
	"encoding/json"
	"io/ioutil"
)

/**
 * ReadConfig reads the application settings from config.json
 */
// tag::readConfig[]
func ReadConfig(path string) (*Config, error) {
	file, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}
	config := Config{}
	if err = json.Unmarshal(file, &config); err != nil {
		return nil, err
	}
	return &config, nil
}

// end::readConfig[]

type Config struct {
	SecurityServiceNeo4jUri      string `json:"PANDA_API_GATEWAY_SECURITY_SERVICE_NEO4J_URI"`
	SecurityServiceNeo4jUsername string `json:"PANDA_API_GATEWAY_SECURITY_SERVICE_NEO4J_USER"`
	SecurityServiceNeo4jPassword string `json:"PANDA_API_GATEWAY_SECURITY_SERVICE_NEO4J_PASSWORD"`

	Port       string `json:"PANDA_API_GATEWAY_PORT"`
	JwtSecret  string `json:"PANDA_API_GATEWAY_JWT_SECRET"`
	SaltRounds int    `json:"PANDA_BCRYPT_SALT_ROUNDS"`
}
