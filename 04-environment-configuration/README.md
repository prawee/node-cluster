# Description
Encapsulate the main process entry to avoid contamination when calling the main process, in line with production use

## Concept
- Main <- exports <- master -> child

## Run it
```bash
cd 03-environment-configuration
node main.js
```