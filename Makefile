SHELL=/bin/bash

%:
	@:

args = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`
serviceRegistryName=$$(jq -r .serviceRegistry package.json)
servicePackageName = $$(jq -r .serviceName package.json)
serviceVersion = $$(jq -r .serviceVersion package.json)

ORM_BIN = $(CURDIR)/node_modules/.bin/typeorm
KEY_OUTPUT_DIR := $(CURDIR)/helpers
PRIVATE_KEY_FILENAME := sig.private.key
PUBLIC_KEY_FILENAME := sig.public.key

.PHONY:
.DEFAULT_GOAL: guide

clean-install:
	@rm -rf node_modules
	@npm install

create-env:
	@sh convertENVJSON.sh

generate_keys:
	@echo "Generating RS512 key pair..."
	openssl genpkey -algorithm RSA -out $(KEY_OUTPUT_DIR)/$(PRIVATE_KEY_FILENAME) -pkeyopt rsa_keygen_bits:2048
	openssl rsa -pubout -in $(KEY_OUTPUT_DIR)/$(PRIVATE_KEY_FILENAME) -out $(KEY_OUTPUT_DIR)/$(PUBLIC_KEY_FILENAME)
	@echo "RS512 key pair generated and saved to $(KEY_OUTPUT_DIR)"

create-server-migration:
	@IS_SERVER=True typeorm migration:create -o ./database/migrations/server/$(call args) -t true || true

generate-server-migration:
	@ IS_SERVER=True FORCE_LOAD_CONFIGURATION=True ${ORM_BIN} migration:generate -d ./database/datasource.js -o ./database/migrations/$(call args) -t true || true

run-server-migration:
	@ FORCE_LOAD_CONFIGURATION=True ${ORM_BIN} migration:run -d ./database/datasource.js