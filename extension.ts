import * as vscode from 'vscode';
import Window = vscode.window;
import QuickPickItem = vscode.QuickPickItem;
import QuickPickOptions = vscode.QuickPickOptions;
import Document = vscode.TextDocument;
import Position = vscode.Position;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import TextEditor = vscode.TextEditor;
//import InputBoxOptions = InputBoxOptions;

var figlet = require('figlet');
import us = require('underscore.string');

export function activate() {
	console.log('Congratulations, your extension "TextTools" is now active!');
	vscode.commands.registerCommand('extension.textFunctions', textFunctions);
}

// String Functions Helper//////////////////////////////
// TODO [P1] - it would be better to use a format like I have for the Underscore calls below - more common code
function toUpper(e: TextEditor, d: TextDocument, sel: Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], txt.toUpperCase());
		});
		//e.updateSelection(sel);
	}
}

// TODO [P1] - it would be better to use a format like I have for the Underscore calls below - more common code
function toLower(e: TextEditor, d: TextDocument, sel: Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], txt.toLowerCase());
		});
		//e.updateSelection(sel);
	}
}

// This function takes a callback function for the text formatting 'formatCB', 
// if there are any args pass an array as 'argsCB'
function processSelection(e: TextEditor, d: TextDocument, sel: Selection[], formatCB, argsCB) {
	// itterate through the selections
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getText(new Range(sel[x].start, sel[x].end));
			
			if (argsCB.length > 0) {
				argsCB.splice(0, 0, txt);
				txt = formatCB.apply(this, argsCB);
			} else {
				txt = formatCB(txt);
			}
			edit.replace(sel[x], txt);
		
			// fix the selection as it could now be longer or shorter
			let startPos: Position = new Position(sel[x].start.line, sel[x].start.character);
			// TODO [p1] the end position is not right - do something that increases or decreases the size 
			// of the selection to see issue e.g. ASC II art or HTML encode/decode
			let endPos: Position = new Position(sel[x].start.line + txt.split(/\r\n|\r|\n/).length, sel[x].start.character + txt.length);
			let replaceRange: Range = new Range(startPos, endPos);

			//e.updateSelection(replaceRange);
		});
	}
}

// Main menu /////////////////////////////////////
function textFunctions() {
	var opts: QuickPickOptions = { matchOnDescription: true, placeHolder: "What do you want to do to the selection(s)?" };
	var items: QuickPickItem[] = [];

	items.push({ label: "toUpper", description: "Convert [aBc] to [ABC]" });
	items.push({ label: "toLower", description: "Convert [aBc] to [abc]" });
	items.push({ label: "swapCase", description: "Convert [aBc] to [AbC]" });
	items.push({ label: "Titleize", description: "Convert [hello world] to [Hello World]" });
	items.push({ label: "Clean String", description: "Convert [hello......world] to [hello world]" });
	items.push({ label: "Reverse", description: "Convert [hello world] to [world hello]" });
	items.push({ label: "Escape HTML", description: "Convert [<div>hello] to [&lt;div&gt;hello]" });
	items.push({ label: "UnEscape HTML", description: "Convert [&lt;div&gt;hello] to [<div>hello]" });
	items.push({ label: "ASCII Art", description: "Convert [hello] to ASCII Art" });

	Window.showQuickPick(items).then((selection) => {
		let e = Window.activeTextEditor;
		let d = e.document;
		let sel = e.selections;

		switch (selection.label) {
			case "toUpper":
				toUpper(e, d, sel);
				break;
			case "toLower":
				toLower(e, d, sel);
				break;
			case "swapCase":
				processSelection(e, d, sel, us.swapCase, []);
				break;
			case "Titleize":
				processSelection(e, d, sel, us.titleize, []);
				break;
			case "Clean String":
				processSelection(e, d, sel, us.clean, []);
				break;
			case "Reverse":
				processSelection(e, d, sel, us.reverse, []);
				break;
			case "Escape HTML":
				processSelection(e, d, sel, us.escapeHTML, []);
				break;
			case "UnEscape HTML":
				processSelection(e, d, sel, us.unescapeHTML, []);
				break;
			case "ASCII Art":
				// build a full list of the fonts for the drop down
				items = [];
                figlet.fontsSync().forEach(function (font) {
					items.push({ label: font, description: "User the "+ font + " font" });
				}, this);
				
				Window.showQuickPick(items).then(function (selection) {
					processSelection(e, d, sel, figlet.textSync, [selection.label]);
				});
				break;
			default:
				console.log("hum this should not have happend - no selection")
				break;
		}
	});
}
