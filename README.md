# README

This extension does the following:

## Keybinding 'Alt+T' - Text Tools
Also available as `command`.

Hit `Alt+T` to get some text replacement tools e.g.

* toUpper
* toLower
* Reverse
* HTML Encode
* ..

![Tools](images/Commands.gif)

Will replace all selections in the current editor.

### Issues: Encode HTML
This function will replace the selection(s) with more text than they had orriginally e.g.

* `hello <div> world`
* Results in `hello &gt;div&lt; world`

In the code I attempt to handle this with some simple re-writing of the selection range from the replacement `txt.length`.  However the resulting selection is much longer.  

Repro:

1. Open a doc
2. select some text w/ html in it
3. `Alt+T' select Encode HTML
4. Resulting selection will be to long and the status bar indication of 'selected' will be incorrect

I see some debug style output in the console for sections as well.