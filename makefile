NODE_VERSION_REQUIRED = 18.12.0
NODE_VERSION_INSTALLED := $(shell node -v 2>/dev/null)

.PHONY: check-node-version install-node setup

check-node-version:
	$(eval NODE_VER=$(shell node -v | cut -d. -f1 | sed 's/v//'))
	@if [ -z "$(NODE_VER)" ]; then \
		echo "Node.js is not installed."; \
		$(MAKE) offer-install; \
	elif [ $(NODE_VER) -lt 18 ]; then \
		echo "Your Node.js version is less than 18."; \
		$(MAKE) offer-install; \
	else \
		echo "Node.js version is satisfactory ($(NODE_VER))."; \
	fi

offer-install:
	@read -p "Do you want to install or upgrade Node.js to the latest version? [y/N] " answer; \
	if [ "$$answer" = "y" ] || [ "$$answer" = "Y" ]; then \
		$(MAKE) install-node; \
	else \
		echo "Skipping Node.js installation or upgrade."; \
		exit 1; \
	fi

install-node:
	@echo "Installing or upgrading Node.js..."
	@curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - 2>/dev/null
	@echo "Node.js installation or upgrade complete."

dev: check-node-version
	@npm install
	@npm run dev