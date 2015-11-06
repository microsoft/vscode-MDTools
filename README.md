# README

This is an example of how to extend [VS Code](http://code.visualstudio.com/Docs/Extensions).  

It covers off the following core concepts:
* Activating your code when a Markdown file is loaded
* Working with QuickOpen to create the menu (and sub menu)
* Binding a function to a keystroke [Alt+T] and `command` - which opens up the menu
* Leveraging external Node modules 
	* [figlet](https://www.npmjs.com/package/figlet) = ASCII art, 
	* [underscore.string](https://www.npmjs.com/package/underscore.string) = string processing
* Grabbing the selected content from the text editor, processing it and replacing it
* Adding metadata to the `project.json` so the extension looks OK in the gallery

# Keybinding 'Alt+T' - Text Tools
Also available as `command` by pressing `F1` the typing `Text Functions`.

Hit `Alt+T` to get some text replacement tools e.g.

* toUpper
* toLower
* Reverse
* HTML Encode
* ..

![Tools](images/Commands.gif)

If you select ASCII Art you will get a secondary menu where you can choose the font.

# Versions
* 0.1.0 - Added ASCII Art and refactored code base to 50% of size
