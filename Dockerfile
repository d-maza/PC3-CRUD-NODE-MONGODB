FROM node:22-bookworm-slim

ENV NVM_DIR=/usr/local/nvm
ENV NODE_VERSION=22.22.1
ENV PATH=${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:${PATH}

RUN apt-get update \
	&& apt-get install -y --no-install-recommends bash ca-certificates curl \
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p ${NVM_DIR} \
	&& curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash \
	&& . ${NVM_DIR}/nvm.sh \
	&& nvm install ${NODE_VERSION} \
	&& nvm alias default ${NODE_VERSION} \
	&& nvm use default \
	&& node -v \
	&& npm -v

RUN printf '%s\n' \
	'export NVM_DIR="/usr/local/nvm"' \
	'[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"' \
	> /etc/profile.d/nvm.sh

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]
