# Description
By separating the child process from the main process code, when fork is issued to the child process, no extraneous code is executed, reducing resource consumption.

## Concept
- Master -> Child

## Run it.
```bash
cd 03-separation-master-child
node master.js
```