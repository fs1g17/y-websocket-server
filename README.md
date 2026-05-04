new approach:

- keep nodejs backend for websocket yjs
- keep Go backend for remote code execution
- keep on-demand remote execution, no need for I/O overhead

things to ponder:

- should I keep "main.go" and "go.mod" in-memory (inside Yjs) first? and only write to them when the user clicks "Run"?
- need to ensure 2 users don't click run at the same time - disable with state
- deleting files? - an easy fix is simply deleting all files before run

so flow is:

- set initial ydoc data (`main.go` and `go.mod`) with setContentInitializor
- then how do we read it? might be better to keep initialisation in the Go code then
