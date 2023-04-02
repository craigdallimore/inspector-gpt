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

### Get rollup running in watch mode

```
./watch.sh
```

### Things to do

- [x] Improve icon (light and dark mode, 16x16)
- [x] MVP for adding `OPENAI_API_KEY`
- [x] Styled components
- [x] Prettier
- [x] A way to clear your token
- [x] MVP chat interface
- [x] Better loading state
- [x] Make conversation scrollable
- [ ] Style code blocks
- [ ] Expose more controls (what are they?)
  - [ ] Clear/new conversation
- [ ] Find and handle limits
- [ ] Hide "clear token"
- [ ] Check it works in Chrome
  - [ ] Nope, needs minfest v3!
- [ ] Get lint working properly
- [ ] Get prettier working properly
- [ ] Add a way to communicate to it from the javascript console
