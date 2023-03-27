# Chat GPT devtools extension

### To load the extension in firefox (simple)

- go to [here](about:debugging#/runtime/this-firefox)
- Click "load temporary add on"

This is also where you go to reload the extension after making changes

Alternatively, use `web-ext` from npm to get live-reload:

```
web-ext run
```

### To see console logs for the extension

- go to [here](about:debugging#/runtime/this-firefox)
- Inspect this extension

### Things to do

- [x] Improve icon (light and dark mode, 16x16)
- [x] MVP for adding `OPENAI_API_KEY`
- [ ] A way to clear your token
- [ ] MVP chat interface
- [ ] Check it works in Chrome
