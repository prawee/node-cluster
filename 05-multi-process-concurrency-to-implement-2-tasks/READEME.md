# Description
Execute 2 main process tasks asynchronously, enabling them to handle more CPU-intensive tasks simultaneously

## Problem
As you can see from the following log, the Node.js kernel does not create multiple master processes because of concurrent calls to the cluster module. Instead, it reuses the existing master process, similar to the singleton mode.

## Concept
- Main <- exports <- master -> child
- Main <- exports <- master -> child

## Run it
```bash
cd 05-multi-process-concurrency-to-implement-2-tasks
node main.js
```