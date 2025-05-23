# Base image replicating your devcontainer image
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Set working directory (Dev Container default is /workspaces/<repo>)
WORKDIR /workspaces/app

# Install dependencies when the container is first built (optional; usually done in postCreateCommand)
# COPY package*.json ./
# RUN npm install

# Default shell (optional)
SHELL ["/bin/bash", "-c"]

# Set default command (optional)
CMD [ "bash" ]

# ...existing code...
RUN curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
RUN curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -m 0755 kubectl /usr/local/bin/kubectl \
    && rm kubectl
# ...existing code...