import * as vscode from 'vscode';

import window = vscode.window;
import workspace = vscode.workspace;
import EditorOptions = vscode.TextEditorOptions;
import QuickPickItem = vscode.QuickPickItem;
import QuickPickOptions = vscode.QuickPickOptions;
import Document = vscode.TextDocument;
import Position = vscode.Position;
import Range = vscode.Range;
import InputBoxOptions = vscode.InputBoxOptions;

import us = require('underscore.string');


export function activate() {
	console.log('Congratulations, your extension "TextTools" is now active!');

	vscode.commands.registerCommand('extension.textFunctions', textFunctions);
}


// Selections test /////////////////////////////////////
function workWithSelections() {
	var e = window.getActiveTextEditor();
	var d = e.getTextDocument();
		
	// Subset of text
	var start = new Position(1, 1);
	var end = new Position(10, 3);
	var range = new Range(start, end);
	console.log("Range: " + d.getTextInRange(range));
		
	// All text
	console.log("All: " + d.getText());
}

// String Functions Helper//////////////////////////////
function toUpper(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getTextInRange(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], txt.toUpperCase());
		});
		e.setSelections(sel)
	}
}

function toLower(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getTextInRange(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], txt.toLowerCase());
		});
		e.setSelections(sel)
	}
}

function swapCase(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getTextInRange(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], us.swapCase(txt));
		});
		e.setSelections(sel)
	}
}


function cleanString(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getTextInRange(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], us.clean(txt));
		});
		e.setSelections(sel)
	}
}



function titleize(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getTextInRange(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], us.titleize(txt));
		});
		e.setSelections(sel)
	}
}

function escapeHTML(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the selections
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			// process the selection and replace in editor
			var txt: string = us.escapeHTML(d.getTextInRange(new Range(sel[x].start, sel[x].end)));
			edit.replace(sel[x], txt);
		
			// fix the selection as it could now be longer or shorter
			let startPos: Position = new Position(sel[x].start.line, sel[x].start.character);
			let endPos: Position = new Position(sel[x].end.line,sel[x].start.character + txt.length);
			let replaceRange : Range = new Range(startPos, endPos);
		
			e.setSelection(replaceRange);	
		});
	}
}

function unescapeHTML(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			let txt: string = d.getTextInRange(new Range(sel[x].start, sel[x].end));
			edit.replace(sel[x], us.unescapeHTML(txt));
		});
		e.setSelections(sel)
	}
}

function reverse(e: vscode.TextEditor, d: vscode.TextDocument, sel: vscode.Selection[]) {
	// itterate through the elections and convert all text to Upper
	for (var x = 0; x < sel.length; x++) {
		e.edit(function(edit) {
			edit.replace(sel[x], us.reverse(d.getTextInRange(new Range(sel[x].start, sel[x].end))));
		});
		e.setSelections(sel)
	}
}

// Text Functions /////////////////////////////////////
function textFunctions() {
	var opts: QuickPickOptions = { matchOnDescription: true, placeHolder: "What do you want to do to the selection(s)?" };

	var items: QuickPickItem[] = [];
	items.push({ label: "toUpper", description: "Convert [aBc] to [ABC]" });
	items.push({ label: "toLower", description: "Convert [aBc] to [abc]" });
	items.push({ label: "swapCase", description: "Convert [aBc] to [AbC]" });
	items.push({ label: "Titleize", description: "Convert [hello world] to [Hello World]" });
	items.push({ label: "Clean String", description: "Convert [hello        world] to [hello world]" });
	items.push({ label: "Reverse", description: "Convert [hello world] to [world hello]" });
	items.push({ label: "Escape HTML", description: "Convert [<div>hello] to [&lt;div&gt;hello]" });
	items.push({ label: "UnEscape HTML", description: "Convert [&lt;div&gt;hello] to [<div>hello]" });


	window.showQuickPick(items).then((selection) => {
		let e = window.getActiveTextEditor();
		let d = e.getTextDocument();
		let sel = e.getSelections();

		switch (selection.label) {
			case "toUpper":
				toUpper(e, d, sel);
				break;
			case "toLower":
				toLower(e, d, sel);
				break;
			case "swapCase":
				swapCase(e, d, sel);
				break;
			case "Titleize":
				titleize(e, d, sel);
				break;
			case "Clean String":
				cleanString(e, d, sel);
				break;
			case "Reverse":
				reverse(e, d, sel);
				break;
			case "Escape HTML":
				escapeHTML(e, d, sel);
				break;
			case "UnEscape HTML":
				unescapeHTML(e, d, sel);
				break;
			default:
				console.log("hum this should not have happend - no selction")
				break;
		}

	});
}



